import {
    removeSongFromMisa,
    updateMisa,
    deleteMisa,
    updateMisaSong,
} from "../services/misas";
import {
    showError,
    showSuccessToast,
    showConfirm,
    showLoading,
} from "@/utils/alerts";

import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", () => {
    // Edit Tone Logic
    const editToneBtns = document.querySelectorAll(
        'button[data-action="edit-tone"]',
    );
    editToneBtns.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent navigation from parent anchor

            const currentTone = btn.getAttribute("data-current-tone");
            const misaId = Number(btn.getAttribute("data-misa-id"));
            const misaSongId = Number(
                btn.getAttribute("data-misa-song-id"),
            );
            const token = document
                .querySelector("main")
                ?.getAttribute("data-token");
            const editToken = document
                .querySelector("main")
                ?.getAttribute("data-edit-token");

            const { value: newTone } = await Swal.fire({
                title: "Cambiar Tono",
                input: "text",
                inputLabel: "Nuevo tono (ej: Do, Re, Mim)",
                inputValue: currentTone || "",
                showCancelButton: true,
                confirmButtonColor: "#f97316",
                cancelButtonColor: "#4b5563",
                confirmButtonText: "Guardar",
                background: "#1f2937",
                color: "#fff",
                inputValidator: (value) => {
                    if (!value) {
                        return "Debes escribir un tono";
                    }
                },
            });

            if (newTone && newTone !== currentTone) {
                showLoading("Actualizando...");
                try {
                    const res = await updateMisaSong(
                        misaId,
                        misaSongId,
                        newTone,
                        token || undefined,
                        editToken || undefined,
                    );
                    if (res.success) {
                        window.location.reload();
                    } else {
                        showError(
                            "Error",
                            res.error || "No se pudo actualizar el tono.",
                        );
                    }
                } catch (err) {
                    showError("Error", "Error de conexión.");
                }
            }
        });
    });

    const buttons = document.querySelectorAll(".add-song-btn");
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const momentId = btn.getAttribute("data-moment-id");
            if ((window as any).openAddSongModal) {
                (window as any).openAddSongModal(momentId);
            } else {
                showError(
                    "Error",
                    "El gestor de canciones no está cargado. Intenta recargar la página.",
                );
            }
        });
    });

    const deleteButtons = document.querySelectorAll(
        'button[data-action="delete-song"]',
    );
    deleteButtons.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();

            const result = await showConfirm(
                "¿Eliminar canción?",
                "No podrás deshacer esta acción",
                "Sí, eliminar",
            );

            if (!result.isConfirmed) return;

            const misaId = Number(btn.getAttribute("data-misa-id"));
            const misaSongId = Number(
                btn.getAttribute("data-misa-song-id"),
            );

            const token = document
                .querySelector("main")
                ?.getAttribute("data-token");
            const editToken = document
                .querySelector("main")
                ?.getAttribute("data-edit-token");

            if (misaId && misaSongId && (token || editToken)) {
                // Mostrar loading
                showLoading("Eliminando...");

                try {
                    const res = await removeSongFromMisa(
                        misaId,
                        misaSongId,
                        token || undefined,
                        editToken || undefined,
                    );
                    if (res.success) {
                        window.location.reload();
                    } else {
                        showError(
                            "Error",
                            res.error || "Error al eliminar.",
                        );
                    }
                } catch (error) {
                    showError("Error", "Error de conexión.");
                }
            }
        });
    });

    const copyToClipboard = async (
        text: string,
        successTitle: string,
        successText: string,
    ) => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                showSuccessToast(successTitle, successText);
            } else {
                throw new Error("Clipboard API not available");
            }
        } catch (err) {
            console.error("Error al copiar", err);
            showError(
                "Error",
                "No se pudo copiar el enlace. Intenta hacerlo manualmente.",
            );
        }
    };

    const copyShareLinkBtn = document.getElementById("copyShareLinkBtn");
    if (copyShareLinkBtn) {
        copyShareLinkBtn.addEventListener("click", () => {
            const shareToken =
                copyShareLinkBtn.getAttribute("data-share-token");
            if (shareToken) {
                const url = `${window.location.origin}${window.location.pathname}?share_token=${shareToken}`;
                copyToClipboard(
                    url,
                    "¡Enlace copiado!",
                    "Compártelo con quien quieras.",
                );
            } else {
                console.error("No share token found");
                showError(
                    "Error",
                    "No se encontró el token para compartir.",
                );
            }
        });
    }

    const copyEditorLinkBtn = document.getElementById("copyEditorLinkBtn");
    if (copyEditorLinkBtn) {
        copyEditorLinkBtn.addEventListener("click", () => {
            const editToken =
                copyEditorLinkBtn.getAttribute("data-edit-token");
            console.log("Copy Editor Btn clicked. Token:", editToken);

            if (editToken) {
                const url = `${window.location.origin}${window.location.pathname}?edit_token=${editToken}`;
                copyToClipboard(
                    url,
                    "¡Enlace de Editor copiado!",
                    "Ten cuidado con quién lo compartes.",
                );
            } else {
                console.error("No edit token found on button");
                showError("Error", "No se encontró el token de edición.");
            }
        });
    }

    // Edit Misa Logic
    const editMisaBtn = document.getElementById("editMisaBtn");
    const editMisaModal = document.getElementById("editMisaModal");
    const closeEditMisaModal =
        document.getElementById("closeEditMisaModal");
    const editMisaForm = document.getElementById(
        "editMisaForm",
    ) as HTMLFormElement;

    if (editMisaBtn && editMisaModal && closeEditMisaModal) {
        editMisaBtn.addEventListener("click", () => {
            editMisaModal.classList.remove("hidden");
        });

        closeEditMisaModal.addEventListener("click", () => {
            editMisaModal.classList.add("hidden");
        });

        editMisaModal.addEventListener("click", (e) => {
            if (e.target === editMisaModal) {
                editMisaModal.classList.add("hidden");
            }
        });
    }

    if (editMisaForm) {
        editMisaForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(editMisaForm);
            const title = formData.get("title")?.toString() || "";
            const dateMisa = formData.get("dateMisa")?.toString() || "";
            const visibility = formData.get("visibility")?.toString() || "";
            const misaId = editMisaForm.getAttribute("data-misa-id");

            const token = document
                .querySelector("main")
                ?.getAttribute("data-token");
            const editToken = document
                .querySelector("main")
                ?.getAttribute("data-edit-token");

            if (!misaId) return;

            if (token || editToken) {
                // Loading button state
                const submitBtn = editMisaForm.querySelector(
                    "button[type='submit']",
                );
                const originalText = submitBtn
                    ? submitBtn.textContent
                    : "Guardar";

                if (submitBtn) {
                    submitBtn.setAttribute("disabled", "true");
                    submitBtn.textContent = "Guardando...";
                }

                try {
                    console.log("Calling updateMisa...");
                    const res = await updateMisa(
                        parseInt(misaId),
                        title,
                        dateMisa,
                        visibility,
                        token || undefined,
                        editToken || undefined,
                    );
                    console.log("updateMisa result:", res);

                    if (res.success) {
                        console.log("Success, showing toast...");
                        await showSuccessToast(
                            "¡Actualizado!",
                            "Los datos de la misa se han guardado",
                        );
                        console.log("Toast shown, reloading...");
                        window.location.reload();
                    } else {
                        showError(
                            "Error",
                            res.error || "Error al actualizar",
                        );

                        if (submitBtn) {
                            submitBtn.removeAttribute("disabled");
                            submitBtn.textContent = originalText;
                        }
                    }
                } catch (error) {
                    console.error(error);
                    showError("Error", "Error de conexión");

                    if (submitBtn) {
                        submitBtn.removeAttribute("disabled");
                        submitBtn.textContent = originalText;
                    }
                }
            }
        });
    }

    const deleteMisaBtn = document.getElementById("deleteMisaBtn");
    if (deleteMisaBtn) {
        deleteMisaBtn.addEventListener("click", async () => {
            const editMisaForm = document.getElementById(
                "editMisaForm",
            ) as HTMLFormElement;
            const misaId = editMisaForm?.getAttribute("data-misa-id");
            const token = document
                .querySelector("main")
                ?.getAttribute("data-token");

            if (!misaId || !token) return;

            const confirmed = await showConfirm(
                "¿Eliminar misa?",
                "Esta acción no se puede deshacer.",
                "Sí, eliminar",
            );

            if (confirmed.isConfirmed) {
                showLoading("Eliminando...");
                try {
                    const res = await deleteMisa(parseInt(misaId), token);
                    if (res.success) {
                        await showSuccessToast(
                            "Misa eliminada",
                            undefined,
                            1500,
                        );
                        window.location.href = "/misas";
                    } else {
                        showError(
                            "Error",
                            res.error || "Error al eliminar",
                        );
                    }
                } catch (e) {
                    showError("Error", "Error de conexión");
                }
            }
        });
    }
});
