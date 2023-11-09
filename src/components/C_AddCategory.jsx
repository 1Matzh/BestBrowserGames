import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');

    const handleCategorySubmit = async (e) => {
        e.preventDefault();

        const cookies = new Cookies();
        const token = cookies.get('token');

        if (!token) {
            alert('Você precisa estar logado como admin para adicionar categorias.');
            return;
        }

        try {
            const response = await fetch('https://bestbrowsergamesapi--1matzh.repl.co/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: categoryName
                })
            });

            if (response.ok) {
                alert('Categoria adicionada com sucesso!');
                setCategoryName('');
            } else {
                alert('Ocorreu um erro ao adicionar a categoria.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao processar a solicitação.');
        }
    };

    return (
        <Form onSubmit={handleCategorySubmit}>
            <Form.Group controlId="formCategoryName">
                <Form.Label>Nome da Categoria</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o nome da categoria"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Adicionar Categoria
            </Button>
        </Form>
    );
};

export default AddCategory;