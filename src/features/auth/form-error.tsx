import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message, }: FormErrorProps ) => {
  if (!message) return null;

  return (
    <div className="bg-red-200 p-1.5 rounded-md flex items-center gap-x-2 text-sm text-red-500">
      <ExclamationTriangleIcon className="w-4 h-4" />
      <p>{ message }</p>
    </div>
  )
}