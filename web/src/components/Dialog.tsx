import * as RadixDialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

type DialogProps = {
  title: string
  children: React.ReactNode
}

export const Dialog: React.FC<DialogProps> = ({ title, children }) => (
  <RadixDialog.Root>
    <RadixDialog.Trigger asChild>
      <button type="button">{title}</button>
    </RadixDialog.Trigger>
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed bg-black inset-0 opacity-25" />
      <RadixDialog.Content className="fixed bg-white p-8 rounded-lg mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <RadixDialog.Title className="font-bold mb-4">{title}</RadixDialog.Title>
        <RadixDialog.Description></RadixDialog.Description>

        {children}

        <RadixDialog.Close asChild>
          <button
            type="button"
            className="absolute top-4 right-4 hover:bg-slate align-middle inline-flex items-center justify-center w-5 h-5 rounded-full"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  </RadixDialog.Root>
)
