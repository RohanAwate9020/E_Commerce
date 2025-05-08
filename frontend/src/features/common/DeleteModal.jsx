

// import { useEffect, useState } from 'react'
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'


// export default function DeleteModal({title,message,dangerOption,cancelOption,dangerAction,showModal}) {
//   const [open, setOpen] = useState(true)

//   const handleDanger = () => {
//     // Handle the action for the danger button here
//     setOpen(false); 
//     dangerAction();
//   }

//   // useEffect(()=>{
//   //   if(showModal){
//   //     setOpen(true);
//   //   }else{
//   //     setOpen(false);
//   //   }
//   // },showModal)

//   useEffect(() => {
//     setOpen(showModal);
//   }, [showModal]);

  
//   return (
//     <Dialog open={open} onClose={setOpen} className="relative z-10">
//       <DialogBackdrop
//         transition
//         className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
//       />

//       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//           <DialogPanel
//             transition
//             className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
//           >
//             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//               <div className="sm:flex sm:items-start">
//                 <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
//                   <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
//                 </div>
//                 <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                   <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
//                     {title}
//                   </DialogTitle>
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-500">
//                       {message}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//               <button
//                 type="button"
//                 onClick={handleDanger}
//                 className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
//               >
//                 {dangerOption}
//               </button>
//               <button
//                 type="button"
//                 data-autofocus
//                 onClick={() => setOpen(false)}
//                 className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
//               >
//                 {cancelOption}
//               </button>
//             </div>
//           </DialogPanel>
//         </div>
//       </div>
//     </Dialog>
//   )
// }


import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function DeleteModal({ isOpen, onClose, title, message, dangerOption = "Delete", cancelOption = "Cancel", onConfirm }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-lg">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <Dialog.Title className="text-lg font-semibold text-gray-900">{title}</Dialog.Title>
              <p className="mt-2 text-sm text-gray-500">{message}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={onConfirm}
              className="inline-flex justify-center rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500"
            >
              {dangerOption}
            </button>
            <button
              onClick={onClose}
              className="inline-flex justify-center rounded border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {cancelOption}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
