-- AlterTable: Добавляем поле slug как nullable
ALTER TABLE "Product" ADD COLUMN "slug" TEXT;

-- Создаем функцию для транслитерации (упрощенная версия)
-- В реальности лучше использовать функцию на стороне приложения
-- Но для миграции создадим базовую функцию
CREATE OR REPLACE FUNCTION transliterate_to_slug(text TEXT) RETURNS TEXT AS $$
DECLARE
    result TEXT;
BEGIN
    result := lower(text);
    -- Базовая транслитерация (можно расширить)
    result := replace(result, 'а', 'a');
    result := replace(result, 'б', 'b');
    result := replace(result, 'в', 'v');
    result := replace(result, 'г', 'g');
    result := replace(result, 'д', 'd');
    result := replace(result, 'е', 'e');
    result := replace(result, 'ё', 'yo');
    result := replace(result, 'ж', 'zh');
    result := replace(result, 'з', 'z');
    result := replace(result, 'и', 'i');
    result := replace(result, 'й', 'y');
    result := replace(result, 'к', 'k');
    result := replace(result, 'л', 'l');
    result := replace(result, 'м', 'm');
    result := replace(result, 'н', 'n');
    result := replace(result, 'о', 'o');
    result := replace(result, 'п', 'p');
    result := replace(result, 'р', 'r');
    result := replace(result, 'с', 's');
    result := replace(result, 'т', 't');
    result := replace(result, 'у', 'u');
    result := replace(result, 'ф', 'f');
    result := replace(result, 'х', 'h');
    result := replace(result, 'ц', 'ts');
    result := replace(result, 'ч', 'ch');
    result := replace(result, 'ш', 'sh');
    result := replace(result, 'щ', 'sch');
    result := replace(result, 'ъ', '');
    result := replace(result, 'ы', 'y');
    result := replace(result, 'ь', '');
    result := replace(result, 'э', 'e');
    result := replace(result, 'ю', 'yu');
    result := replace(result, 'я', 'ya');
    result := replace(result, ' ', '-');
    result := regexp_replace(result, '[^a-z0-9-]', '', 'g');
    result := regexp_replace(result, '-+', '-', 'g');
    result := trim(both '-' from result);
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Обновляем существующие записи
DO $$
DECLARE
    rec RECORD;
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER;
BEGIN
    FOR rec IN SELECT id, title FROM "Product" WHERE slug IS NULL LOOP
        base_slug := transliterate_to_slug(rec.title);
        final_slug := base_slug;
        counter := 1;
        
        -- Проверяем уникальность
        WHILE EXISTS (SELECT 1 FROM "Product" WHERE slug = final_slug) LOOP
            final_slug := base_slug || '-' || counter;
            counter := counter + 1;
        END LOOP;
        
        UPDATE "Product" SET slug = final_slug WHERE id = rec.id;
    END LOOP;
END $$;

-- Удаляем временную функцию
DROP FUNCTION transliterate_to_slug(TEXT);

-- Делаем поле обязательным и уникальным
ALTER TABLE "Product" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");



