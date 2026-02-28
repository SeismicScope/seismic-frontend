import Image from "next/image";

import { useCopyToClipboard } from "@/shared/hooks/use-copy-to-clipboard";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Field, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";

import { useShortUrl } from "../hooks/use-short-url";
import { useShortUrlQR } from "../hooks/use-short-url-qr";

function ShareContent() {
  const { copyToClipboard } = useCopyToClipboard();
  const { data: shortLink, isLoading } = useShortUrl();

  const { data: qr } = useShortUrlQR(shortLink?.code ?? "", {
    enabled: !!shortLink?.code,
  });

  const shortUrl = shortLink?.code
    ? `${process.env.NEXT_PUBLIC_APP_URL}/s/${shortLink.code}`
    : "";

  return (
    <div className="flex flex-col gap-3">
      <Field>
        <FieldLabel htmlFor="input-button-group">Share link</FieldLabel>
        <ButtonGroup>
          <Input
            id="input-button-group"
            value={shortUrl}
            placeholder={isLoading ? "Generating..." : "Share link"}
            readOnly
          />
          <Button
            variant="outline"
            disabled={!shortUrl}
            onClick={() => copyToClipboard(shortUrl)}
          >
            Copy
          </Button>
        </ButtonGroup>
      </Field>
      <Field>
        <FieldLabel>OR Scan QR code</FieldLabel>
        {qr ? (
          <Image src={qr.qr} alt="QR Code" width={200} height={200} />
        ) : (
          <div className="bg-muted h-[200px] w-[200px] animate-pulse rounded" />
        )}
      </Field>
    </div>
  );
}

export default ShareContent;
