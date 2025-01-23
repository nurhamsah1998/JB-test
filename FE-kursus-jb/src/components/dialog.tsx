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
  onClickSubmit,
  children,
  buttonLabel = "text here",
  title = "title here",
  titleDesc,
}: {
  titleDesc: string;
  title: string;
  buttonLabel: string;
  idCloseDialog: string;
  disabledSubmit: boolean;
  onClickSubmit: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{buttonLabel}</Button>
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
            <Button id={idCloseDialog} type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={disabledSubmit} onClick={onClickSubmit}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
