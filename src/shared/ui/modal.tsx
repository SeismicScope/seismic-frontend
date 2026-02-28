import { Dialog, DialogContent } from "./dialog";

export function Modal({
  children,
  handleOpenChange,
}: {
  children: React.ReactNode;
  handleOpenChange?: (open: boolean) => void;
}) {
  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
}
