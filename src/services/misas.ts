import type { Misa } from "../types/misa";
import { API_URL, type ServiceResponse } from "./songs";

export const getMisas = async (token?: string): Promise<ServiceResponse<Misa[]>> => {
    try {
        const headers: HeadersInit = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        const res = await fetch(`${API_URL}/misas`, { headers });
        if (!res.ok) {
            return { success: false, error: "Error al obtener las misas." };
        }
        const data = await res.json();
        return { success: true, data };
    } catch (e) {
        console.error("Service exception:", e);
        return { success: false, error: "Error de conexión." };
    }
};

export const createMisa = async (title: string, dateMisa: string, visibility: string = "PUBLIC", token?: string): Promise<ServiceResponse<Misa>> => {
    try {
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(`${API_URL}/misas`, {
            method: "POST",
            headers,
            credentials: "include",
            body: JSON.stringify({ title, dateMisa, visibility }),
        });

        if (!res.ok) {
            const errData = await res.json();
            return { success: false, error: "Error al crear la misa.", data: errData };
        }

        const data = await res.json();
        return { success: true, data };
    } catch (e) {
        console.error("Service exception:", e);
        return { success: false, error: "Error de conexión." };
    }
};

export const updateMisa = async (id: number, title: string, dateMisa: string, visibility: string, token: string | undefined, editToken?: string): Promise<ServiceResponse<Misa>> => {
    try {
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        let url = `${API_URL}/misas/${id}`;
        if (editToken) {
            url += `?edit_token=${editToken}`;
        }

        const res = await fetch(url, {
            method: "PUT",
            headers,
            body: JSON.stringify({ title, dateMisa, visibility }),
        });
        if (!res.ok) {
            const err = await res.json();
            return { success: false, error: err.error || "Error al actualizar la misa." };
        }
        const data = await res.json();
        return { success: true, data };
    } catch (e) {
        console.error("Service exception:", e);
        return { success: false, error: "Error de conexión." };
    }
};

export const addSongToMisa = async (misaId: number, songId: number, momentId: number | null, key: string, token: string | undefined, editToken?: string): Promise<ServiceResponse<any>> => {
    try {
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        let url = `${API_URL}/misas/${misaId}/songs`;
        if (editToken) {
            url += `?edit_token=${editToken}`;
        }

        const res = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify({ songId, momentId, key }),
        });

        if (!res.ok) {
            const errData = await res.json();
            return { success: false, error: "Error al agregar la canción.", data: errData };
        }

        const data = await res.json();
        return { success: true, data };
    } catch (e) {
        console.error("Service exception:", e);
        return { success: false, error: "Error de conexión." };
    }
};

export const removeSongFromMisa = async (misaId: number, misaSongId: number, token: string | undefined, editToken?: string): Promise<ServiceResponse<any>> => {
    try {
        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        let url = `${API_URL}/misas/${misaId}/songs/${misaSongId}`;
        if (editToken) {
            url += `?edit_token=${editToken}`;
        }

        const res = await fetch(url, {
            method: "DELETE",
            headers,
            credentials: "include",
        });

        if (!res.ok) {
            return { success: false, error: "Error al eliminar la canción." };
        }

        return { success: true };
    } catch (e) {
        console.error("Service exception:", e);
        return { success: false, error: "Error de conexión." };
    }
};
