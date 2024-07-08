'use client';

import { useState, useTransition } from "react";

import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { fileSchema } from '@/secure/file-schema';

import { useForm } from "react-hook-form";

import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";

import { Input } from "@/components/ui/input";

import { uploadFile } from "@/actions/file-action";

import { FormError } from "@/features/auth/form-error";
import { FormSuccess } from "@/features/auth/form-success";

import * as XLSX from "xlsx";

export const ExcelForm = () => {

  const [ error, setError ] = useState<string>('');
  const [ success, setSuccess ] = useState<string>('');
  const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
  const [ sheetData, setSheetData ] = useState<any[][] | null>(null);
  
  const [ isPending, startTransition ] = useTransition();

  const form = useForm<z.infer<typeof fileSchema>> ({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      file: undefined,
    }
  })

  //const fileRef = form.register("file");

  const onSubmit = async (value: z.infer<typeof fileSchema>) => {
    
    startTransition(() => {
      if(sheetData) {
        uploadFile({ file : sheetData })
        .then((data) => {
          if (data && data.error){
            setError(data.error)
          }
        })
        .catch((error) => {
          setError(error.message)
        })
      } else {
        setError('Veuillez sélectionner un fichier')
      }
    })
  }

  const handleClickChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      try {
        const sheetData = await readExcelFile(file);
        console.log('sheetData : ', sheetData);
        setSheetData(sheetData)
      } catch(error) {
        console.error('Erreur lors du chargement du fichier Excel', error)
      }
    } else {
      setSelectedFile(null);
    }
  }

  const readExcelFile = (file: File): Promise<any[][]> => {
      return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = e.target?.result as ArrayBuffer;
      const workbook = XLSX.read(data, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const filterData = sheetData.slice(1)
      resolve(filterData as any[][]);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
    fileReader.readAsArrayBuffer(file);
  });
  }
  
  return (
    <div className="w-full flex flex-col items-center justify-center mt-10 gap-4">
      <div className="flex flex-col items-center justify-center space-y-6">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="excel_file">
                      <div className="flex items-center justify-center">
                        <i className="fi fi-sr-file-excel text-[150px] text-blue-300"></i>
                      </div>
                      {sheetData && (
                        <div className="flex items-center justify-center">
                          <div className="text-sm text-gray-500">
                            <p className="font-[600]">
                              <span className="text-blue-500 font-[700]">{sheetData.length}</span> lignes seront extraites.
                            </p>
                          </div>
                        </div>
                      )}
                    </FormLabel>
                    <FormControl>
                      <input
                        id="excel_file"
                        type="file"
                        accept=".xlsx"
                        className="hidden file-input file-input-bordered file-input-info w-full max-w-xs"
                        onChange={(e) => {
                          field.onChange(e)
                          handleClickChange(e)
                        }}
                        //{...field}
                        />
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="text-xs text-bg flex font-[600] w-full justify-center bg-gray-400 p-1.5 rounded-md">
                      {selectedFile ? (<>
                    <span>Fichier sélectionné : {selectedFile.name}</span></>) : "Cliquer sur l'icône pour sélectionner un fichier excel"}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormError message={error}/>
              {selectedFile && (
      <Button disabled={isPending} type="submit" className="max-w-xs w-full h-[48px] bg-[#0390D0] hover:bg-[#036394] text-bg font-[600]">
        {isPending ? <Loader className="mr-2 h-6 w-6 text-white"/> : "Extraire les données"}
      </Button>
              )}
          </form>
        </Form>
      </div>
    </div>
  )
}