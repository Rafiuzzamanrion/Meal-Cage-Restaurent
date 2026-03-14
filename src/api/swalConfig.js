import Swal from 'sweetalert2';

const modernSwal = Swal.mixin({
    customClass: {
        popup: 'swal2-popup',
        title: 'swal2-title',
        htmlContainer: 'swal2-html-container',
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel',
    },
    buttonsStyling: false,
    background: '#1a1a1a',
    color: '#f5f5f5',
});

export default modernSwal;
