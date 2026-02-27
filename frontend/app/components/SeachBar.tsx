export default function SearchBar(){
  return(
    <div className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-3/4">
      <h1 className="text-5xl m-[15px]">Seach For Study Sessions</h1>
      <input type="text" name="search" id="search" className="border-2 rounded-md pl-2 selection::bg-transparent mb-2 w-[50vw]"></input>
    </div>
    );
}