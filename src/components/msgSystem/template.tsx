import React from 'react';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Select from 'react-select';
import { DataTable } from 'mantine-datatable';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const rowDataType = [
    {
        id: 'ObjectId("654dc95d5fde0679c97f5afb")',
        name: 'Login alert',
        desc: 'Send email notification when login success.',
        msgChannelId: 'ObjectId("654dc88e5fde0679c97f5afa")',
        status: 'inactive',
    },
    {
        id: 'ObjectId("654dc95d5fde0679c97f5afc")',
        name: 'Forgot password alert',
        desc: 'Send email notification when forgot password success.',
        msgChannelId: 'ObjectId("654dc88e5fde0679c97f5afb")',
        status: 'active',
    },
    {
        id: 'ObjectId("654dc95d5fde0679c97f5afd")',
        name: 'Contact us',
        desc: 'Send email notification when contact us.',
        msgChannelId: 'ObjectId("654dc88e5fde0679c97f5afc")',
        status: 'active',
    },
];
const rowTemplateData = [
    {
        id: 'ObjectId("654dccf35fde0679c97f5afd")',
        name: 'Forgot Password',
        desc: 'Forgot Password Email.',
        messageTypeId: 'ObjectId("654dc9c65fde0679c97f5afc")',
        messageTypeName: 'Forgot Password',
        content: {
            subject: 'Complete your password reset request',
            body: `<h1><span class="il">Reset</span>&nbsp;your&nbsp;<span class="il">password</span></h1>
<p><span class="il">Hi John,</span></p>
<p><span class="il">Let's reset your password so you can get back to login.</span></p>
<table style="border-collapse: collapse; width: 100%;" border="1">
<tbody>
<tr>
<td style="width: 700px; text-align: center;"><strong>Reset Password</strong></td>
</tr>
</tbody>
</table>
<p><span class="il">If you did not ask to reset your password you may want to review your recent account access for any unusual activity.</span></p>
<p><span class="il">We're here to help if you need it. Visit the Help Center for more info or contact us.<br /></span></p>
<p><strong><span class="il">The BBO team</span></strong></p>`,
        },
        status: 'inactive',
    },
    {
        id: 'ObjectId("654dccf35fde0679c97f5afd")',
        name: 'Contact Us',
        desc: 'Contact Us Email.',
        messageTypeId: 'ObjectId("654dc9c65fde0679c97f5afc")',
        messageTypeName: 'Contact Us',
        content: {
            subject: 'Contact Us Email Subject',
            body: `<h1><span class="il">Contact</span>&nbsp;Us</h1>`,
        },
        status: 'active',
    },
];

export default function MsgTemplate() {
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [search, setSearch] = useState('');

    // template zone
    const [pageTemplate, setPageTemplate] = useState(1);
    const [pageSizeTemplate, setPageSizeTemplate] = useState(PAGE_SIZES[0]);
    const [initialRecordsTemplate, setInitialRecordsTemplate] = useState(rowTemplateData);
    const [recordsDataTemplate, setRecordsDataTemplate] = useState(initialRecordsTemplate);
    const [searchTemplate, setSearchTemplate] = useState('');
    const [filterTemplate, setFilterTemplate] = useState('');
    const [modalEditTemplate, setModalEditTemplate] = useState(false);
    const [modalAddTemplate, setModalAddTemplate] = useState(false);
    const [modalDeleteTemplate, setModalDeleteTemplate] = useState(false);

    interface IType {
        value: string;
        label: string;
    }
    const [typeSelected, setTypeSelected] = useState<IType[]>([]);
    const [dataForEditTemplate, setDataForEditTemplate] = useState({
        id: '',
        name: '',
        desc: '',
        messageTypeId: '',
        content: {
            subject: '',
            body: '',
        },
        status: '',
    } as any);
    const [statusToggleTemplate, setStatusToggleTemplate] = useState(false);

    const [templateValue, setTemplateValue] = useState('');
    const handleChangeTemplate = (event: any) => {
        const { name, value } = event.target;
        setDataForEditTemplate((dataForEditTemplate: any) => ({
            ...dataForEditTemplate,
            [name]: value,
        }));
    };

    const openEditModalTemplate = (data: any) => {
        setTemplateValue('');
        setTypeSelected([]);
        rowDataType.map((item) => {
            setTypeSelected((typeSelected) => [...typeSelected, { value: item.id, label: item.name }]);
        });

        data.status === 'active' ? setStatusToggleTemplate(true) : setStatusToggleTemplate(false);
        setDataForEditTemplate(data);
        setModalEditTemplate(true);
    };
    const openAddModalTemplate = () => {
        setTemplateValue('');
        rowDataType.map((item) => {
            setTypeSelected((typeSelected) => [...typeSelected, { value: item.id, label: item.name }]);
        });
        setModalAddTemplate(true);
    };
    useEffect(() => {
        setPageTemplate(1);
    }, [pageSizeTemplate]);
    useEffect(() => {
        const from = (pageTemplate - 1) * pageSizeTemplate;
        const to = from + pageSizeTemplate;
        setRecordsDataTemplate([...initialRecordsTemplate.slice(from, to)]);
    }, [pageTemplate, pageSizeTemplate, initialRecordsTemplate]);
    useEffect(() => {
        setInitialRecordsTemplate(() => {
            return rowTemplateData.filter((item) => {
                return (
                    item.id.toString().includes(searchTemplate.toLowerCase()) ||
                    item.name.toLowerCase().includes(searchTemplate.toLowerCase()) ||
                    item.status.toLowerCase().includes(searchTemplate.toLowerCase())
                );
            });
        });
    }, [searchTemplate, rowTemplateData]);
    useEffect(() => {
        setInitialRecordsTemplate(() => {
            return rowTemplateData.filter((item) => {
                const searchfilter = filterTemplate === 'active' ? 'active' : filterTemplate === 'inactive' ? 'inactive' : '';
                if (searchfilter === 'active') {
                    return (
                        (item.id.toString().includes(searchTemplate.toLowerCase()) ||
                            item.name.toLowerCase().includes(searchTemplate.toLowerCase()) ||
                            item.status.toLowerCase().includes(searchTemplate.toLowerCase())) &&
                        item.status === 'active'
                    );
                } else if (searchfilter === 'inactive') {
                    return (
                        (item.id.toString().includes(searchTemplate.toLowerCase()) ||
                            item.name.toLowerCase().includes(searchTemplate.toLowerCase()) ||
                            item.status.toLowerCase().includes(searchTemplate.toLowerCase())) &&
                        item.status === 'inactive'
                    );
                } else {
                    return (
                        item.id.toString().includes(searchTemplate.toLowerCase()) ||
                        item.name.toLowerCase().includes(searchTemplate.toLowerCase()) ||
                        item.status.toLowerCase().includes(searchTemplate.toLowerCase())
                    );
                }
            });
        });
    }, [filterTemplate]);
    return (
        <div>
            <div className="active pt-5">
                <div className="grid xl:grid-cols-3 gap-6 mb-6">
                    <div className="panel h-full xl:col-span-3">
                        <div className="flex items-center justify-end mb-5">
                            <h5 className="mr-3 font-semibold text-lg dark:text-white-light">
                                <button onClick={() => setModalAddTemplate(true)} type="button" className="btn btn-primary">
                                    + Add new
                                </button>
                            </h5>
                            <div className=" mr-3">
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-1 pl-5 pr-1 flex items-center pointer-events-none">
                                        <svg width="11" height="4" viewBox="0 0 11 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.8" d="M1 1L5.44643 3L9.89286 1" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <select id="filter" name="filter" value={filterTemplate} onChange={(e) => setFilterTemplate(e.target.value)} className="form-input w-auto pr-5">
                                        <option selected>All status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 right-1 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </div>
                                <input className="form-input w-auto pr-4" placeholder="Search..." value={filterTemplate} onChange={(e) => setFilterTemplate(e.target.value)} />
                            </div>
                        </div>

                        <div className="datatables">
                            <DataTable
                                striped
                                className="whitespace-nowrap table-striped"
                                records={recordsDataTemplate}
                                columns={[
                                    { accessor: 'name', title: 'Provider' },
                                    { accessor: 'desc', title: 'Description' },
                                    { accessor: 'messageTypeName', title: 'Type' },
                                    {
                                        accessor: 'status',
                                        title: 'status',
                                        width: '200px',
                                        render: ({ status }) => {
                                            if (status === 'active') {
                                                return <span className="badge badge-outline-success">Active</span>;
                                            } else if (status === 'inactive') {
                                                return <span className="badge badge-outline-danger">Inactive</span>;
                                            } else if (status === 'pending') {
                                                return <span className="badge badge-outline-wanning">Pending</span>;
                                            } else {
                                                return <span className="badge badge-outline-dark">Unknown</span>;
                                            }
                                        },
                                    },
                                    {
                                        accessor: 'actions',
                                        title: '',
                                        // align: 'center',
                                        width: '200px',
                                        render: (item) => {
                                            return (
                                                <>
                                                    <div className="flex justify-around">
                                                        <button type="button" onClick={() => openEditModalTemplate(item)} className="btn btn-warning py-3">
                                                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M6.79061 2.54174H2.59307C2.14777 2.54174 1.72071 2.691 1.40583 2.95667C1.09096 3.22235 0.914063 3.58268 0.914062 3.95841V11.7501C0.914063 12.1258 1.09096 12.4861 1.40583 12.7518C1.72071 13.0175 2.14777 13.1667 2.59307 13.1667H11.8276C12.2729 13.1667 12.7 13.0175 13.0149 12.7518C13.3298 12.4861 13.5067 12.1258 13.5067 11.7501V8.20841M12.3196 1.54016C12.4745 1.40485 12.6597 1.29693 12.8646 1.22268C13.0694 1.14843 13.2898 1.10935 13.5127 1.10772C13.7356 1.10608 13.9567 1.14193 14.1631 1.21316C14.3694 1.28439 14.5569 1.38958 14.7145 1.5226C14.8722 1.65561 14.9968 1.81379 15.0813 1.98789C15.1657 2.16199 15.2082 2.34854 15.2062 2.53664C15.2043 2.72475 15.158 2.91064 15.07 3.08348C14.982 3.25632 14.8541 3.41264 14.6937 3.54332L7.48572 9.62507H5.11159V7.62191L12.3196 1.54016Z"
                                                                    stroke="white"
                                                                    stroke-linecap="square"
                                                                    stroke-linejoin="round"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button type="button" onClick={() => setModalDeleteTemplate(true)} className="btn btn-danger py-3">
                                                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M5.5 7.25V11.75M8.5 7.25V11.75M1 4.25H13M12.25 4.25L11.5997 13.3565C11.5728 13.7349 11.4035 14.0891 11.1258 14.3477C10.8482 14.6063 10.4829 14.75 10.1035 14.75H3.8965C3.5171 14.75 3.1518 14.6063 2.87416 14.3477C2.59653 14.0891 2.42719 13.7349 2.40025 13.3565L1.75 4.25H12.25ZM9.25 4.25V2C9.25 1.80109 9.17098 1.61032 9.03033 1.46967C8.88968 1.32902 8.69891 1.25 8.5 1.25H5.5C5.30109 1.25 5.11032 1.32902 4.96967 1.46967C4.82902 1.61032 4.75 1.80109 4.75 2V4.25H9.25Z"
                                                                    stroke="white"
                                                                    stroke-linecap="square"
                                                                    stroke-linejoin="round"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </>
                                            );
                                        },
                                    },
                                ]}
                                totalRecords={initialRecordsTemplate.length}
                                recordsPerPage={pageSize}
                                page={page}
                                onPageChange={(p) => setPage(p)}
                                // recordsPerPageOptions={PAGE_SIZES}
                                // onRecordsPerPageChange={setPageSize}
                                minHeight={200}
                                paginationText={({ from, to, totalRecords }) => ``}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* modal zone */}

            {/* edit */}
            <Transition appear show={modalEditTemplate} as={Fragment}>
                <Dialog as="div" open={modalEditTemplate} onClose={() => setModalEditTemplate(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-visible my-8 w-full max-w-2xl text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <div className="text-lg font-bold">Edit Template</div>
                                        
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="flex items-center justify-end my-4 mr-5">
                                                <label htmlFor="">Template</label>
                                                <input
                                                    value={dataForEditTemplate.name}
                                                    onChange={handleChangeTemplate}
                                                    name="name"
                                                    type="text"
                                                    placeholder=""
                                                    className="w-3/4 ml-5 form-input text-base"
                                                    required
                                                />
                                            </div>
                                            <div className="flex items-start justify-end my-4 mr-5">
                                                <label htmlFor="">Description</label>
                                                <textarea
                                                    value={dataForEditTemplate.desc}
                                                    onChange={handleChangeTemplate}
                                                    name="desc"
                                                    placeholder=""
                                                    className="w-3/4 ml-5 form-input text-base"
                                                    required
                                                />
                                            </div>

                                            <div className="flex items-start justify-end my-4 mr-5 overflow-visible">
                                                <label htmlFor="">Type</label>
                                                <div className="w-3/4 ml-5 text-base">
                                                    <Select defaultValue={typeSelected[0]} options={typeSelected} isSearchable={false} />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-end my-4 mr-5">
                                                <label className="ml-5 text-base pt-4" htmlFor="">
                                                    Subject
                                                </label>
                                                <input
                                                    value={dataForEditTemplate.content.subject}
                                                    onChange={handleChangeTemplate}
                                                    name="content.subject"
                                                    type="text"
                                                    placeholder=""
                                                    className="w-3/4 ml-5 form-input text-base"
                                                    required
                                                />
                                            </div>

                                            <div className="flex items-start justify-end my-4 mr-5">
                                                <label className="ml-5 text-base pt-4" htmlFor="">
                                                    Body
                                                </label>
                                                <div className="w-3/4 ml-5 text-base">
                                                    <ReactQuill theme="snow" value={dataForEditTemplate.content.body} onChange={setTemplateValue} />
                                                </div>{' '}
                                            </div>
                                            <div className="flex items-start justify-end my-4 mr-5">
                                                <label htmlFor="">Status</label>
                                                <div className="w-3/4 ml-5 flex items-center">
                                                    <label className="w-12 h-6 relative">
                                                        <input
                                                            type="checkbox"
                                                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                            id="custom_switch_checkbox1"
                                                            checked={statusToggleTemplate}
                                                            onChange={() => setStatusToggleTemplate(!statusToggleTemplate)}
                                                        />
                                                        <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300"></span>
                                                    </label>
                                                    {statusToggleTemplate ? <span className="text-sm text-success px-5">Active</span> : <span className="text-sm text-danger px-5">Inactive</span>}
                                                </div>
                                            </div>
                                        </form>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn bg-[#848080] text-white" onClick={() => setModalEditTemplate(false)}>
                                                Cancel
                                            </button>
                                            <button type="button" className="btn btn-info ltr:ml-4 rtl:mr-4" onClick={() => setModalEditTemplate(false)}>
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* add */}
            <Transition appear show={modalAddTemplate} as={Fragment}>
                <Dialog as="div" open={modalAddTemplate} onClose={() => setModalAddTemplate(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-visible my-8 w-full max-w-2xl text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <div className="text-lg font-bold">Add Template</div>
                                        
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="flex items-center justify-end my-4 mr-5">
                                                <label htmlFor="">Template</label>
                                                <input type="text" placeholder="" className="w-3/4 ml-5 form-input text-base" required />
                                            </div>
                                            <div className="flex items-start justify-end my-4 mr-5">
                                                <label htmlFor="">Description</label>
                                                <textarea placeholder="" className="w-3/4 ml-5 form-input text-base" required />
                                            </div>

                                            <div className="flex items-start justify-end my-4 mr-5 overflow-visible">
                                                <label htmlFor="">Type</label>
                                                <div className="w-3/4 ml-5 text-base">
                                                    <Select defaultValue={typeSelected[0]} options={typeSelected} isSearchable={false} />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end my-4 mr-5">
                                                <label className="ml-5 text-base pt-4" htmlFor="">
                                                    Subject
                                                </label>
                                                <input type="text" placeholder="" className="w-3/4 ml-5 form-input text-base" required />
                                            </div>

                                            <div className="flex items-start justify-end my-4 mr-5">
                                                <label className="ml-5 text-base pt-4" htmlFor="">
                                                    Body
                                                </label>
                                                <div className="w-3/4 ml-5 text-base">
                                                    <ReactQuill theme="snow" value={templateValue} onChange={setTemplateValue} />
                                                </div>{' '}
                                            </div>

                                            <div className="flex items-start justify-end my-4 mr-5">
                                                <label htmlFor="">Status</label>
                                                <div className="w-3/4 ml-5 flex items-center">
                                                    <label className="w-12 h-6 relative">
                                                        <input
                                                            type="checkbox"
                                                            className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                            id="custom_switch_checkbox1"
                                                            checked={statusToggleTemplate}
                                                            onChange={() => setStatusToggleTemplate(!statusToggleTemplate)}
                                                        />
                                                        <span className="outline_checkbox bg-icon border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300"></span>
                                                    </label>
                                                    {statusToggleTemplate ? <span className="text-sm text-success px-5">Active</span> : <span className="text-sm text-danger px-5">Inactive</span>}
                                                </div>
                                            </div>
                                        </form>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn bg-[#848080] text-white" onClick={() => setModalAddTemplate(false)}>
                                                Cancel
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setModalAddTemplate(false)}>
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* delect */}
            <Transition appear show={modalDeleteTemplate} as={Fragment}>
                <Dialog as="div" open={modalDeleteTemplate} onClose={() => setModalDeleteTemplate(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-md text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <div className="text-lg font-bold"></div>
                                       
                                    </div>
                                    <div className="p-5 flex flex-col justify-center items-center">
                                        <svg width="30" height="34" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15.333 19.6667V33.6667M24.6663 19.6667V33.6667M1.33301 10.3333H38.6663M36.333 10.3333L34.31 38.6647C34.2262 39.842 33.6994 40.9439 32.8356 41.7483C31.9718 42.5528 30.8353 43 29.655 43H10.3443C9.164 43 8.0275 42.5528 7.16374 41.7483C6.29998 40.9439 5.77315 39.842 5.68934 38.6647L3.66634 10.3333H36.333ZM26.9997 10.3333V3.33333C26.9997 2.71449 26.7538 2.121 26.3163 1.68342C25.8787 1.24583 25.2852 1 24.6663 1H15.333C14.7142 1 14.1207 1.24583 13.6831 1.68342C13.2455 2.121 12.9997 2.71449 12.9997 3.33333V10.3333H26.9997Z"
                                                stroke="black"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>

                                        <span className="font-bold mt-5">Are you sure ?</span>
                                        <span className="mb-3">This operation cannot be undone.</span>
                                        <div className="flex flex-row mt-5">
                                            <button type="button" className="btn btn-outline-dark mx-2">
                                                No, cancel
                                            </button>
                                            <button type="button" className="btn btn-danger mx-2">
                                                Yes, I’m sure
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
