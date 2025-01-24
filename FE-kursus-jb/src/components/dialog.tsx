import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CustomDialog({
  idCloseDialog,
  disabledSubmit,
  onClickSubmit = () => {},
  children,
  buttonLabel = "text here",
  labelSubmit = "Create",
  title = "title here",
  titleDesc,
  onClickCancel = () => {},
  size,
  classNameButtonLabel,
}: {
  labelSubmit?: string;
  classNameButtonLabel?: string;
  titleDesc: string;
  title: string;
  buttonLabel: string;
  idCloseDialog: string;
  disabledSubmit: boolean;
  onClickCancel?: () => void;
  onClickSubmit: () => void;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  size?: any;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabledSubmit}
          className={classNameButtonLabel}
          size={size}
        >
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(i) => i.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{titleDesc}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={onClickCancel}
              id={idCloseDialog}
              type="button"
              variant="secondary"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={disabledSubmit} onClick={onClickSubmit}>
            {labelSubmit}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
