import Header from "./components/Header";

export default function Home() {
  return (
    <Header>
      <div className="w-full min-h-[calc(100vh-65px)] flex justify-center items-center bg-[url('/hero-image.png')] bg-cover bg-no-repeat bg-center">
        <div className="w-[600px] flex flex-col items-center justify-center py-[80px] bg-white">
          <h1 className="m-0 py-[2px] font-vietnam text-dark font-semibold text-[36px]">
            Search
          </h1>
          <p className="m-0 py-[2px] font-vietnam font-light text-[16px] text-gray">
            Search high-resolution images from Unsplash
          </p>
          <div className="w-[90%] my-[20px] relative">
            <input
              type="text"
              placeholder="Enter your keywords..."
              className="w-full px-[20px] py-[15px] rounded-[5px] border border-light-transparent font-vietnam font-medium text-[14px] text-dark focus:outline-none"
            />

            <img
              src="/Search.svg"
              alt="search"
              className="absolute right-[20px] top-1/2 -translate-y-1/2 w-[25px] pointer-events-none"
            />
          </div>
        </div>
      </div>
    </Header>
  );
}