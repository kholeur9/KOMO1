import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message, }: FormSuccessProps ) => {
  if (!message) return null;

  return (
    <div className="bg-green-400 p-1.5 rounded-md flex items-center gap-x-2 text-sm text-emerald-700">
      <CheckCircledIcon className="w-4 h-4" />
      <p>{ message }</p>
    </div>
  )
}