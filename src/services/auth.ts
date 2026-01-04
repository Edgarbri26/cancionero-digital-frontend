export const register = async (name: string, email: string, password: string) => {
    const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:3000/api";

    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });

    return response;
};

export const login = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {

    const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:3000/api";
    if (!email || !password) {
        console.error("Email and Password are required");
        return null;
    }

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
    });

    return response;
}
