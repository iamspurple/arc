"use client";

import {
    Admin,
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    Edit,
    List,
    NumberField,
    NumberInput,
    Resource,
    SimpleForm,
    TextField,
    TextInput,
    ArrayInput,
    SimpleFormIterator,
    ArrayField,
    useInput,
} from "react-admin";
import { MemoryRouter } from "react-router";
import { customDataProvider } from "@/lib/adminDataProvider";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useRecordContext } from "react-admin";
import { Box, Typography, Button, CircularProgress } from "@mui/material";

const ImagesCountField = () => {
    const record = useRecordContext();
    if (!record) return null;
    return <span>{record.images ? record.images.length : 0}</span>;
};

// Кастомный компонент для загрузки изображений
const ImageFileInput = ({ source }: { source: string; label?: string }) => {
    const { field } = useInput({ source });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const imageUrl = field.value || "";
    
    const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        // Проверяем тип файла
        if (!file.type.startsWith("image/")) {
            setError("Разрешены только изображения");
            return;
        }
        
        setUploading(true);
        setError(null);
        
        try {
            const formData = new FormData();
            formData.append("file", file);
            
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Ошибка загрузки");
            }
            
            const data = await response.json();
            field.onChange(data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ошибка загрузки");
        } finally {
            setUploading(false);
        }
    };
    
    const handleRemove = () => {
        field.onChange("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    
    const handleClick = () => {
        fileInputRef.current?.click();
    };
    
    return (
        <Box sx={{ mb: 2, width: "100%" }}>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: "none" }}
            />
            
            {imageUrl ? (
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <Box sx={{ position: "relative" }}>
                        <img 
                            src={imageUrl} 
                            alt="Превью" 
                            style={{ 
                                width: "150px", 
                                height: "150px", 
                                objectFit: "cover",
                                border: "1px solid #444",
                                borderRadius: "8px"
                            }} 
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/placeholder.png";
                            }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Typography variant="body2" sx={{ color: "#aaa", wordBreak: "break-all" }}>
                            {imageUrl}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleClick}
                            >
                                📁 Заменить
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={handleRemove}
                            >
                                🗑️ Удалить
                            </Button>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box
                    onClick={handleClick}
                    sx={{
                        width: "100%",
                        minHeight: "120px",
                        border: "2px dashed #555",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "border-color 0.2s",
                        "&:hover": {
                            borderColor: "#888",
                        },
                    }}
                >
                    {uploading ? (
                        <CircularProgress size={32} />
                    ) : (
                        <>
                            <Typography sx={{ fontSize: 40, mb: 1 }}>📷</Typography>
                            <Typography variant="body2" sx={{ color: "#888" }}>
                                Нажмите для выбора изображения
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#666" }}>
                                JPG, PNG, GIF, WebP
                            </Typography>
                        </>
                    )}
                </Box>
            )}
            
            {error && (
                <Typography variant="body2" sx={{ color: "error.main", mt: 1 }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

const ProductList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="title" />
            <TextField source="slug" />
            <NumberField source="price" />
            <BooleanField source="inStock" />
            <ImagesCountField label="Изображений" />
        </Datagrid>
    </List>
);

const ProductEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" fullWidth />
            <TextInput source="slug" disabled fullWidth />
            <TextInput source="description" multiline fullWidth />
            <TextInput source="composition" fullWidth />
            <TextInput source="care" fullWidth />
            <TextInput source="sizes" fullWidth />
            <NumberInput source="price" />
            <BooleanInput source="inStock" />
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Изображения</Typography>
            <ArrayInput source="images">
                <SimpleFormIterator>
                    <ImageFileInput source="url" label="Имя файла" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

const ProductCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" required fullWidth />
            <TextInput source="description" multiline fullWidth />
            <TextInput source="composition" fullWidth />
            <TextInput source="care" fullWidth />
            <TextInput source="sizes" fullWidth />
            <NumberInput source="price" required />
            <BooleanInput source="inStock" defaultValue={true} />
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Изображения</Typography>
            <ArrayInput source="images">
                <SimpleFormIterator>
                    <ImageFileInput source="url" label="Имя файла" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export default function AdminPanelPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <MemoryRouter>
            <Admin dataProvider={customDataProvider}>
                <Resource 
                    name="products" 
                    list={ProductList} 
                    edit={ProductEdit} 
                    create={ProductCreate} 
                />
            </Admin>
        </MemoryRouter>
    );
}
