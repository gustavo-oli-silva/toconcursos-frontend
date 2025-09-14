import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface DialogGenericoProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description?: string
    icon?: React.ReactNode
    children: React.ReactNode
    confirmLabel: string
    cancelLabel: string
    onConfirm: () => void
    onCancel: () => void
    confirmDisabled?: boolean
}

export function DialogGenerico({
    isOpen,
    onOpenChange,
    title,
    description,
    icon,
    children,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
    confirmDisabled
}: DialogGenericoProps){
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger />
            <DialogContent className="bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-3xl shadow-2xl">
                <DialogHeader>
                    {icon && <div className="mb-4">{icon}</div>}
                    <DialogTitle className="text-xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                        {title}
                    </DialogTitle>
                    {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
                </DialogHeader>

                <div className="mt-4">{children}</div>

                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={() => {
                            onCancel();
                            onOpenChange(false);
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onOpenChange(false);
                        }}
                        disabled={confirmDisabled}
                        className={`px-4 py-2 rounded-lg text-white transition ${
                            confirmDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}