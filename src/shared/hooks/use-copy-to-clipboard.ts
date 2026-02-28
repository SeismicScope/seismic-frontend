import { toast } from "sonner";

export function useCopyToClipboard() {
  function copyToClipboard(text: string) {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        toast.success("Copied to clipboard");
      });
    }
  }

  return { copyToClipboard };
}
