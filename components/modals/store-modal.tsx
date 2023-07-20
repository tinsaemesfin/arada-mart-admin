"use client"

import { useStoreModal } from "@/hooks/use-store-model"
import { Modal } from "@/components/ui/modal"

export const StoreModal=()=>{
    const storeModal = useStoreModal();

return(
    <Modal title="Create Store"
    description="Create a new store to mange product and cat"
    onClose={storeModal.onClose}
    isOpen={storeModal.isOpen}
    >

   </Modal>
)
    
}