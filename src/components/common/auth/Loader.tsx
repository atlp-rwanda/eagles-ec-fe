const Spinner = () => (
  <div className=" w-full h-[100vh] flex justify-center items-center">
    <div
      className="inline-block h-8 w-8 sm:h-16 sm:w-16 animate-spin rounded-full border-4 border-solid border-[#DB4444] border-e-transparent text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    />
  </div>
);

export default Spinner;
