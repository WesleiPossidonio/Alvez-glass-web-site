import { useEffect, useState } from "react";

const STORAGE_KEY = "@privacy-cookie-accepted";

export const CookiePopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);

    if (!accepted) {
      setOpen(true);
    }
  }, []);

  // BLOQUEAR SCROLL DA PÁGINA
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, "false");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] shadow-lg">
      <div className="bg-white shadow-2xl rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
        {/* Texto */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">
            Política de Privacidade & Cookies
          </h2>

          <p className="mt-1 text-sm text-gray-600 leading-relaxed">
            Utilizamos cookies para melhorar sua experiência, personalizar
            conteúdo e analisar o tráfego do site.
          </p>
        </div>

        {/* Botões */}
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleDecline}
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Recusar
          </button>

          <button
            onClick={handleAccept}
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-base-blue text-white hover:bg-base-blue-hover transition"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
};
