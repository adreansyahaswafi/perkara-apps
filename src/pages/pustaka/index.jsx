import { ArchiveBoxArrowDownIcon, MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "../../components/BreadCrumbs";
import Table from "../../components/Datatable";
import Form from "../../components/HooksForm/Form";
import Input from "../../components/HooksForm/Input";
import Pagination from "../../components/Pagination";
import useListData from "./hooks-integration/useListData";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import { useState } from "react";

const User = ({ title, level }) => {
    const breadcrumbItems = [
        { label: 'Pustaka Pasal', href: '/pustaka' },
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
    const TableConfiguration = {
        columns: [
            {
                key: 'nama_peraturan', title: 'Nama Peraturan',
                onSort: sort => setparams(prev => ({ ...prev, sort })),
                render: (value, row) => <Link className="text-blue-400" to={`/pustaka/${row?._id}`}>{value ?? "-"}</Link>
            },
            {
                key: 'jenis_peraturan', title: 'Jenis Peraturan',
                onSort: sort => setparams(prev => ({ ...prev, sort })),
                render: (value) => value ? value + " Tahun" : "-"

            },
            {
                key: 'tahun_peraturan', title: 'Tahun',
                onSort: sort => setparams(prev => ({ ...prev, sort })),
                render: (value) => value ?? "-"
            },
            {
                key: 'link_pdf', title: 'File',
                onSort: sort => setparams(prev => ({ ...prev, sort })),
                render: (value) => (
                    <button onClick={() => { setpassed(value) }} type="button" className="bg-blue-400 cursor-pointer text-white flex gap-1 items-center p-2 rounded-md"><ArchiveBoxArrowDownIcon className="h-5" /> Preview</button>
                )
            }
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
                    <div className="bg-white flex justify-between border-t-3 border-t-blue-400 rounded-md border-1 shadow-sm p-5 relative border-gray-200">
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
                        {level === 'master' && <div className="flex justify-end">
                            <Link
                                to="/pustaka/create"
                                className={`p-2 px-6 bg-blue-400 flex items-center gap-2 cursor-pointer rounded-md text-base text-white hover:bg-blue-500 hover:text-white`}
                            >
                                <PlusCircleIcon className="h-8" />
                                <span>Tambah</span>
                            </Link>
                        </div>}
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
        </Form>
    )
}
export default User;