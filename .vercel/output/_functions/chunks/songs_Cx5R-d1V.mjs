const API_URL = "https://letras-acordes-backend.onrender.com/api";
const extractSongData = (formData) => {
  return {
    title: formData.get("title")?.toString() || "",
    artist: formData.get("artist")?.toString() || "Desconocido",
    key: formData.get("key")?.toString() || "C",
    url_song: formData.get("url_song")?.toString() || "",
    content: formData.get("content")?.toString() || "",
    categoryId: parseInt(formData.get("categoryId")?.toString() || "1")
  };
};
const createSong = async (formData, token) => {
  const data = extractSongData(formData);
  if (!data.title.trim()) {
    return { success: false, error: "El título de la canción es obligatorio." };
  }
  try {
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Cookie"] = `token=${token}`;
    }
    const res = await fetch(`${API_URL}/songs`, {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const errData = await res.json();
      return { success: false, error: "Error al guardar la canción.", data: errData };
    }
    const savedSong = await res.json();
    return { success: true, data: savedSong };
  } catch (e) {
    console.error("Service exception:", e);
    return { success: false, error: "Error de conexión con el servidor." };
  }
};
const updateSong = async (id, formData, token) => {
  const data = extractSongData(formData);
  if (!data.title.trim()) {
    return { success: false, error: "El título de la canción es obligatorio." };
  }
  try {
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Cookie"] = `token=${token}`;
    }
    const res = await fetch(`${API_URL}/songs/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const errData = await res.json();
      return { success: false, error: "Error al actualizar la canción.", data: errData };
    }
    const updatedSong = await res.json();
    return { success: true, data: updatedSong };
  } catch (e) {
    console.error("Service exception:", e);
    return { success: false, error: "Error de conexión con el servidor." };
  }
};

export { createSong as c, updateSong as u };
