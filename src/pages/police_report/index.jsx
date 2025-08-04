import { MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "../../components/BreadCrumbs";
import Table from "../../components/Datatable";
import Form from "../../components/HooksForm/Form";
import Input from "../../components/HooksForm/Input";
import Pagination from "../../components/Pagination";
import useListData from "./hooks-integration/useListData";
import useDeleteData from "./hooks-integration/useDeleteData";
import { TrashIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Modal from "../../components/Modal";
import { useState } from "react";

const User = ({ title }) => {
    const breadcrumbItems = [
        { label: 'Laporan Polisi', href: '/laporan-polisi' },
    ];
    const defaultValue = {
        perPage: 10,
        keyword: "",
        page: 1,
        sort: '',
        unpaged: false
    }
    const { data, loading, params, setparams } = useListData({ params: defaultValue });
    const [pased, setpassed] = useState(null);
    const { postData } = useDeleteData();
    const handleDelete = () => {
        postData({ id: pased });
        setpassed(null);
        setparams(defaultValue);
    }
    const TableConfiguration = {
        columns: [
            {
                key: 'no_laporan', title: 'No. LP',
                onSort: sort => setparams(prev => ({ ...prev, sort })),
                render: (value, row) => <Link className="text-blue-400" to={`/laporan-polisi/${row?._id}`}>{value ?? "-"}</Link>
            },
            {
                key: 'pelapor', title: 'Nama Pelapor',
                onSort: sort => setparams(prev => ({ ...prev, sort })),
                render: (value) => value ?? "-"
            },
            {
                key: 'lokasi', title: 'Lokasi',
                onSort: sort => setparams(prev => ({ ...prev, sort })),
                render: (value) => value ?? "-"
            },
            {
                key: 'tanggal_kejadian', title: 'Tanggal Kejadian',
                onSort: sort => setparams(prev => ({ ...prev, sort })),
                render: (value) => {
                    const tanggal = new Date(value);
                    const hasil = format(tanggal, "EEEE, dd MMMM yyyy | hh:mm", { locale: id });
                    return hasil ?? "-"
                }
            },
            {
                key: 'tanggal_laporan', title: 'Tanggal laporan',
                onSort: sort => setparams(prev => ({ ...prev, sort })),
                render: (value) => {
                    const tanggal = new Date(value);
                    const hasil = format(tanggal, "EEEE, dd MMMM yyyy | hh:mm", { locale: id });
                    return hasil ?? "-"
                }
            },
            {
                key: 'status', title: 'Status',
                onSort: sort => setparams(prev => ({ ...prev, sort })),
                render: (value) => value ?? "-"
            },
            {
                key: '-', title: 'Aksi',
                onSort: sort => setparams(prev => ({ ...prev, sort })),
                render: (_, row) => (
                    <button onClick={() => {
                        setpassed(row?._id)
                    }} type="button" className="bg-red-400 cursor-pointer p-2 text-center text-white text-sm rounded-sm items-center flex gap-1"><TrashIcon className="h-4 text-white text-sm" />Hapus</button>
                )
            },
        ]
    }
    return (
        <Form defaultValues={defaultValue}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <Breadcrumb items={breadcrumbItems} />
                </div>
                <div className="text-sm flex flex-col gap-4">
                    <div className="bg-white flex justify-between border-t-3 border-t-red-400 rounded-md border-1 shadow-sm p-5 relative border-gray-200">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="w-[20rem]">
                                <Input
                                    isDebounce={true}
                                    onChangeDebounced={(raw) => setparams(prev => ({
                                        ...prev,
                                        keyword: raw?.target?.value
                                    }))}
                                    name="keyword"
                                    // disabled={true}
                                    placeholder="Search"
                                    prefix={<MagnifyingGlassIcon className="h-5 px-2" />}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Link
                                to="/laporan-polisi/create"
                                className={`p-2 px-6 bg-blue-400 flex items-center gap-2 cursor-pointer rounded-md text-base text-white hover:bg-blue-500 hover:text-white`}
                            >
                                <PlusCircleIcon className="h-8" />
                                <span>Tambah</span>
                            </Link>
                        </div>
                    </div>
                    <Table
                        {...TableConfiguration}
                        loading={loading}
                        dataList={data?.data?.content}
                        params={params ?? defaultValue}
                    />
                    <div className="flex justify-end pb-4 px-1">
                        <Pagination
                            showRowsPerPage={false}
                            onChangePage={({ page, size }) => setparams(prev => ({ ...prev, page, size }))}
                            totalPage={data?.totalPages}
                            currentPage={params?.page}
                            limitPage={data?.size}
                        />
                    </div>
                </div>
            </div>
            <Modal isOpen={!!pased} onClose={() => setpassed(null)} title="Konfirmasi">
                <p className="text-gray-600 text-base">
                    Apakah anda ingin hapus data ini ?
                </p>
                <div className="flex gap-2 mt-4 justify-end">
                    <button
                        onClick={() => setpassed(null)}
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
        </Form>
    )
}
export default User;