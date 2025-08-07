import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumbs";
import useDetailData from "./hooks-integration/useDetailData";
import { format } from 'date-fns';
import { id as idDate } from 'date-fns/locale';
import { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { ArchiveBoxArrowDownIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import useDeletedData from "./hooks-integration/useDeleteData";
import Modal from "../../components/Modal";

const Detail = ({ title, level }) => {
    const breadcrumbItems = [
        { label: 'Pustaka Pasal', href: '/pustaka' },
        { label: 'Detail Pustaka Pasal' },
    ];

    const { id } = useParams();
    const { data, loading } = useDetailData({ id });
    const [tanggalDibuat, setTanggalDibuat] = useState("-");
    const [tanggalDiubah, setTanggalDiubah] = useState("-");
    const { postData } = useDeletedData();
    const [openDelete, setOpenDelete] = useState(false);
    const [pased, setpassed] = useState(null);


    useEffect(() => {
        if (loading === 'resolved') {
            const created = new Date(data?.data?.content?.createdAt);
            const updated = new Date(data?.data?.content?.updatedAt);
            setTanggalDibuat(format(created, "EEEE, dd MMMM yyyy", { locale: idDate }));
            setTanggalDiubah(format(updated, "EEEE, dd MMMM yyyy | HH:mm", { locale: idDate }));
        } else {
            setTanggalDibuat("-");
            setTanggalDiubah("-");
        }
    }, [loading]);

    const handleDelete = () => {
        postData({ id });
    }

    const item = data?.data?.content;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    {['master', 'admin'].includes(level) && <div className="flex justify-end mt-4">
                        <button
                            onClick={() => { setOpenDelete(!openDelete) }}
                            className="p-2 px-6 bg-red-400 cursor-pointer text-sm flex items-center gap-2 rounded-md text-white hover:bg-red-500"
                        >
                            <TrashIcon className="h-6" />
                            <span>Hapus Pasal</span>
                        </button>
                    </div>}
                </div>
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="rounded-md relative mt-8 text-base shadow-lg p-6 border-t-2 border-t-blue-400">
                <h2 className="text-xl absolute top-[-1.5rem] bg-blue-400 w-sm p-2 font-bold text-white px-4">Detail Pustaka Pasal</h2>

                <div className="flex flex-col gap-2">
                    <div className="flex my-2 gap-2">
                        <div className="w-52 font-semibold">Nama Peraturan</div>
                        <div>:</div>
                        <div className="flex-1">{item?.nama_peraturan}</div>
                    </div>

                    <div className="flex my-2 gap-2">
                        <div className="w-52 font-semibold">Jenis Peraturan</div>
                        <div>:</div>
                        <div className="flex-1">{item?.jenis_peraturan}</div>
                    </div>

                    <div className="flex my-2 gap-2">
                        <div className="w-52 font-semibold">Tahun Peraturan</div>
                        <div>:</div>
                        <div className="flex-1">{item?.tahun_peraturan}</div>
                    </div>

                    <div className="flex my-2 gap-2">
                        <div className="w-52 font-semibold">Tanggal Dibuat</div>
                        <div>:</div>
                        <div className="flex-1">{tanggalDibuat}</div>
                    </div>

                    <div className="flex my-2 gap-2">
                        <div className="w-52 font-semibold">Terakhir Diubah</div>
                        <div>:</div>
                        <div className="flex-1">{tanggalDiubah}</div>
                    </div>

                    <div className="flex items-center my-2 gap-2">
                        <div className="w-52 font-semibold">File(PDF)</div>
                        <div>:</div>
                        <button type="button" onClick={() => { setpassed(item?.link_pdf) }} className="bg-blue-400 cursor-pointer text-white flex gap-1 items-center p-2 rounded-md"><ArchiveBoxArrowDownIcon className="h-5" /> Preview</button>
                    </div>
                </div>

            </div>

            {['master', 'admin'].includes(level) && <div className="flex justify-end">
                <Link
                    to={`/pustaka/${id}/edit`}
                    className={`p-2 px-6 bg-green-600 flex items-center gap-2 cursor-pointer rounded-md text-base text-white hover:bg-green-700 hover:text-white`}
                >
                    <PencilSquareIcon className="h-6" />
                    <span>Edit</span>
                </Link>
            </div>}
            <Modal isOpen={openDelete} onClose={setOpenDelete} title="Konfirmasi">
                <p className="text-gray-600 text-base">
                    Apakah anda ingin hapus pasal ini ?
                </p>
                <div className="flex gap-2 mt-4 justify-end">
                    <button
                        onClick={() => setOpenDelete(!openDelete)}
                        type="button"
                        className={`p-1 px-2 bg-blue-400 flex items-center gap-1 cursor-pointer rounded-md text-sm text-white hover:bg-blue-500 hover:text-white`}
                    >
                        <XCircleIcon className="h-5" />
                        <span>Tidak</span>
                    </button>
                    <button
                        onClick={handleDelete}
                        type="button"
                        className={`p-2 px-2 bg-red-400 flex items-center gap-1 cursor-pointer rounded-md text-sm text-white hover:bg-red-500 hover:text-white`}
                    >
                        <TrashIcon className="h-5" />
                        <span>Hapus</span>
                    </button>
                </div>
            </Modal>
            <Modal size="xl" isOpen={!!pased} onClose={() => setpassed(null)} title="Konfirmasi">
                <div className="flex flex-col gap-2 mt-4 justify-end">
                    <iframe
                        src={`${import.meta.env.VITE_API_URL}uploads/${pased}`}
                        width="100%"
                        height="600px"
                        title="Preview PDF"
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={() => setpassed(null)}
                            type="button"
                            className={`p-3 px-4 bg-blue-400 flex items-center gap-1 cursor-pointer rounded-md text-base text-white hover:bg-blue-500 hover:text-white`}
                        >
                            <XCircleIcon className="h-5" />
                            <span>Tutup</span>
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Detail;
