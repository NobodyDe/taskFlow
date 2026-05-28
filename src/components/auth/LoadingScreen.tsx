import React from 'react'

/**
 * LoadingScreen Component
 *
 * Uma tela de carregamento minimalista que ocupa toda a viewport.
 * Utiliza o sistema de cores definido no tema do projeto (oklch).
 */
const LoadingScreen: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      role="status"
      aria-live="polite"
      aria-label="Carregando conteúdo"
    >
      {/* Container do Spinner */}
      <div className="relative flex flex-col items-center gap-4">
        {/* Spinner Minimalista */}
        <div className="h-10 w-10 animate-spin rounded-full border-3 border-gray-700 border-t-gray-300" />

        {/* Texto opcional/Acessibilidade */}
        <span className="text-sm text-gray-500">Carregando</span>
      </div>
    </div>
  )
}

export default LoadingScreen
