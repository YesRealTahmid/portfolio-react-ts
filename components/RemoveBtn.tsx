'use client'

import { useRouter } from 'next/navigation';
import React from 'react';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2'; // Import SweetAlert2

interface RemoveBtnProps {
    id: string;
}

const RemoveBtn: React.FC<RemoveBtnProps> = ({ id }) => {
    const router = useRouter();

    // Function to handle the delete action
    const removeTopic = async () => {
        // Using SweetAlert2 to show a custom confirmation modal
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            reverseButtons: true,  // Reverses the order of the buttons
        });

        if (result.isConfirmed) {
            // Proceed with the delete action if the user confirmed
            const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                Swal.fire(
                    'Deleted!',
                    'Your topic has been deleted.',
                    'success'
                ).then(() => {
                    router.push('/dashboard/editBlog');  
                });
            } else {
                Swal.fire(
                    'Error!',
                    'There was a problem deleting the topic. Please try again.',
                    'error'
                );
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'Your Blog is safe :)', 'info');
        }
    };

    return (
        <button
            onClick={removeTopic}
            className="bg-[#1e1e1f] text-white px-4 py-4 rounded"
        >
            <MdDelete />
        </button>
    );
};

export default RemoveBtn;
