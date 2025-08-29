// import SearchFilterBar from "@/components/common/SearchBar";
// import { Pencil, Trash2, Lock, Unlock } from "lucide-react";
// import { useState } from "react";

// // IMPORTS DOS MODAIS

// import DeletePublicationModal from "@/components/common/DeletePublicationModal";
// import ComponetButton from "@/components/common/button";
// import { RegisterUserModal } from "@/components/users/regularUser/BuyForm";
// import { EditUserModal } from "@/components/users/regularUser/EditUserModal";
// import { User } from "@/types/services";

// export type UserStatus = "Ativo" | "Inativo";

// /* ------------------------------------------------------------------
//    AUXILIARES
// ------------------------------------------------------------------------ */
// function isLicenseValid(date: string): boolean {
//   const [d, m, y] = date.split("-").map(Number);
//   const exp = new Date(y, m - 1, d);
//   return new Date() <= exp;
// }

// function getStatus(u: User): UserStatus {
//   return isLicenseValid(u.expirationDate) ? "Ativo" : "Inativo";
// }

// function getStatusColor(status: UserStatus) {
//   switch (status) {
//     case "Ativo":
//       return "bg-green-100 text-green-700";
//     case "Inativo":
//       return "bg-red-100 text-red-700";
//   }
// }

// type NewUserData = {
//   name: string;
//   email: string;
//   gender: string;
//   license: string;
//   expirationDate: string;
// };

// /* ------------------------------------------------------------------
//    DADOS INICIAIS
// ------------------------------------------------------------------------ */
// const initialUsers: User[] = [];

// const filterOptions = [
//   { value: "Todos", label: "Todos" },
//   { value: "Ativo", label: "Ativo" },
//   { value: "Inativo", label: "Inativo" },
// ];

// export default function UsersPage() {
//   const [users, setUsers] = useState<User[]>(initialUsers);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("Todos");
//   const [isFilterOpen, setFilterOpen] = useState(false);

//   // modais
//   const [isAddOpen, setAddOpen] = useState(false);
//   const [isEditOpen, setEditOpen] = useState(false);
//   const [isDeleteOpen, setDeleteOpen] = useState(false);
//   const [selected, setSelected] = useState<User | null>(null);

//   const handleAdd = (data: NewUserData) => {
//     const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
//     // Cast to User; ensure other required fields have defaults or are optional in User type
//     setUsers((prev) => [...prev, { id, isBlocked: false, ...data } as User]);
//   };

//   const handleEdit = (u: User) => {
//     if (u.isBlocked) return;
//     setSelected(u);
//     setEditOpen(true);
//   };

//   const handleSave = (updated: User) => {
//     setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
//   };

//   const handleDelete = () => {
//     if (!selected) return;
//     setUsers((prev) => prev.filter((u) => u.id !== selected.id));
//     setDeleteOpen(false);
//   };

//   const handleBlock = (id: number) => {
//     setUsers((prev) =>
//       prev.map((u) => (u.id === id ? { ...u, isBlocked: !u.isBlocked } : u))
//     );
//   };

//   // filtro e busca
//   const filtered = users.filter((u) => {
//     const matchSearch = [u.name, u.email, u.gender].some((field) =>
//       field.toLowerCase().includes(search.toLowerCase())
//     );
//     const status = getStatus(u);
//     const matchFilter = filter === "Todos" || status === filter;
//     return matchSearch && matchFilter;
//   });

//   return (
//     <div className="p-6">
//       <SearchFilterBar
//         title="Usuários"
//         searchTerm={search}
//         setSearchTerm={setSearch}
//         filterType={filter}
//         setFilterType={setFilter}
//         filterOptions={filterOptions}
//         isFilterOpen={isFilterOpen}
//         toggleFilterDropdown={() => setFilterOpen((o) => !o)}
//         closeFilterDropdown={() => setFilterOpen(false)}
//       />

//       <div className="flex justify-end w-full mb-4">
//         <ComponetButton
//           variant="primary"
//           onClick={() => setAddOpen(true)}
//           className="w-auto"
//         >
//           Registrar
//         </ComponetButton>
//       </div>
//       <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-auto w-60 md:w-99 min-w-full md:h-[55vh] h-auto">
//         {/* <DataStatusHandler
//           // isLoading={isLoading}
//           // error={error}
//           // onRetry={refetch}
//         > */}
//         <table className="w-full text-left text-xs md:text-sm border-collapse">
//           <thead className="bg-gray-100 border-b dark:bg-gray-900 dark:border-gray-800">
//             <tr>
//               <th className="py-3 px-2 md:px-4 whitespace-nowrap">Id</th>
//               <th className="py-3 px-2 md:px-4 whitespace-nowrap">Nome</th>
//               <th className="py-3 px-2 md:px-4 whitespace-nowrap">Email</th>
//               <th className="py-3 px-2 md:px-4 whitespace-nowrap">Gênero</th>
//               <th className="py-3 px-2 md:px-4 whitespace-nowrap">Licença</th>
//               <th className="py-3 px-2 md:px-4 whitespace-nowrap">Expiração</th>
//               <th className="py-3 px-2 md:px-4 whitespace-nowrap">Estado</th>
//               <th className="py-3 px-2 md:px-4 whitespace-nowrap">Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.length ? (
//               filtered.map((u) => {
//                 const status = getStatus(u);
//                 return (
//                   <tr
//                     key={u.id}
//                     className="border-b dark:border-gray-800 dark:text-gray-400 border-gray-100"
//                   >
//                     <td className="py-2 px-2 md:px-4 md:py-3 whitespace-nowrap">
//                       {u.id}
//                     </td>
//                     <td className="py-2 px-2 md:px-4 md:py-3 whitespace-nowrap">
//                       {u.name}
//                     </td>
//                     <td className="py-2 px-2 md:px-4 md:py-3 whitespace-nowrap">
//                       {u.email}
//                     </td>
//                     <td className="py-2 px-2 md:px-4 md:py-3 whitespace-nowrap">
//                       {u.gender}
//                     </td>
//                     <td className="py-2 px-2 md:px-4 md:py-3 whitespace-nowrap">
//                       {u.license}
//                     </td>
//                     <td className="py-2 px-2 md:px-4 md:py-3 whitespace-nowrap">
//                       {" "}
//                       {u.expirationDate}
//                     </td>
//                     <td className="py-2 px-2 md:px-4 md:py-3 whitespace-nowrap">
//                       <span
//                         className={`px-2 py-1 rounded ${getStatusColor(
//                           status
//                         )}`}
//                       >
//                         {status}
//                       </span>
//                     </td>
//                     <td className="flex gap-2 py-2 px-2 md:px-4 md:py-3 whitespace-nowrap">
//                       <button
//                         disabled={u.isBlocked}
//                         onClick={() => handleEdit(u)}
//                       >
//                         <Pencil size={18} />
//                       </button>
//                       <button
//                         onClick={() => {
//                           setSelected(u);
//                           setDeleteOpen(true);
//                         }}
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                       {u.isBlocked ? (
//                         <button onClick={() => handleBlock(u.id)}>
//                           <Unlock size={18} />
//                         </button>
//                       ) : (
//                         <button onClick={() => handleBlock(u.id)}>
//                           <Lock size={18} />
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan={7} className="text-center py-4 text-gray-500">
//                   Nenhum resultado encontrado.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         {/* </DataStatusHandler> */}
//       </div>

//       <DeletePublicationModal
//         isOpen={isDeleteOpen}
//         onClose={() => setDeleteOpen(false)}
//         onConfirm={handleDelete}
//         title="Excluir Usuário"
//         message="Deseja realmente excluir este usuário?"
//         confirmText="Excluir"
//         cancelText="Cancelar"
//       />

//       <RegisterUserModal
//         isOpen={isAddOpen}
//         onClose={() => setAddOpen(false)}
//         onSubmit={handleAdd}
//       />

//       <EditUserModal
//         isOpen={isEditOpen && !!selected}
//         onClose={() => {
//           setEditOpen(false);
//           setSelected(null);
//         }}
//         user={selected!}
//         onSave={handleSave}
//       />
//     </div>
//   );
// }
