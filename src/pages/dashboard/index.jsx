import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "../../components/BreadCrumbs";
import { BookOpenIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import useDashboard from "./hooks-integration/useDashboard";
import Spinner from "../../components/Spinner";

const Dashboard = () => {
    const breadcrumbItems = [
        { label: 'Beranda', href: '/' },
    ];
    const { data: dashboard, loading } = useDashboard();
    // console.log(dashboard?.total_laporan_polisi)
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold">Beranda</h1>
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="pt-8 grid grid-cols-2 gap-4">
                <div className="relative cursor-pointer flex justify-between border-t-3 border-t-green-600 rounded shadow-md p-5 transform transition-transform hover:scale-105">
                    <div className="absolute top-[-22px]">
                        <div className="bg-green-600 shadow-md p-4 rounded">
                            <ClipboardDocumentCheckIcon className="h-12 text-white" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full justify-end gap-4">
                        <div className="text-base text-neutral-500 font-normal text-end">Laporan Polisi</div>
                        <div className="flex justify-between">
                            <div className="text-2xl text-end font-semibold text-neutral-600"> Total</div>
                            <div className="text-2xl text-end font-bold">{loading === "resolved" ? dashboard?.total_laporan_polisi : <Spinner color="text-green-600" />}</div>
                        </div>
                        <div className="border-t-1 border-t-neutral-200 w-full" />
                        <div className="flex gap-2 items-center">
                            <ArrowRightCircleIcon className="h-4 text-neutral-400" />
                            <span className="text-sm text-neutral-400">Selengkapnya</span>
                        </div>
                    </div>
                </div>
                {/* <div className="relative cursor-pointer flex justify-between border-t-3 border-t-amber-400  rounded shadow-md p-5 transform transition-transform hover:scale-105">
                    <div className="absolute top-[-22px]">
                        <div className="bg-amber-400   shadow-md p-4 rounded">
                            <BriefcaseIcon className="h-12 text-white" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full justify-end gap-4">
                        <div className="text-base text-neutral-500 font-normal text-end">Register Laporan Polisi</div>
                        <div className="flex justify-between">
                            <div className="text-2xl text-end font-semibold text-neutral-600"> Total</div>
                            <div className="text-2xl text-end font-bold">{loading === "resolved" ? dashboard?.total_register_laporan : <Spinner color="text-amber-400" />}</div>
                        </div>
                        <div className="border-t-1 border-t-neutral-200 w-full" />
                        <div className="flex gap-2 items-center">
                            <ArrowRightCircleIcon className="h-4 text-neutral-400" />
                            <span className="text-sm text-neutral-400">Selengkapnya</span>
                        </div>
                    </div>
                </div> */}
                <div className="relative cursor-pointer flex justify-between border-t-3 border-t-red-500 rounded shadow-md p-5 transform transition-transform hover:scale-105">
                    <div className="absolute top-[-22px]">
                        <div className="bg-red-500 shadow-md p-4 rounded">
                            <BookOpenIcon className="h-12 text-white" />
                        </div>
                    </div>
                    <div className="flex flex-col w-full justify-end gap-4">
                        <div className="text-base text-neutral-500 font-normal text-end ">Library</div>
                        <div className="flex justify-between">
                            <div className="text-2xl text-end font-semibold text-neutral-600"> Total</div>
                            <div className="text-2xl text-end font-bold">{loading === "resolved" ? dashboard?.total_pasal ?? 0 : <Spinner color="text-red-500" />}</div>
                        </div>
                        <div className="border-t-1 border-t-neutral-200 w-full" />
                        <div className="flex gap-2 items-center">
                            <ArrowRightCircleIcon className="h-4 text-neutral-400" />
                            <span className="text-sm text-neutral-400">Selengkapnya</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;