const ErrorComp = (props: {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="m-auto flex max-w-2xl gap-6 divide-x overflow-hidden rounded-lg shadow-md dark:dark:divide-gray-700 dark:dark:bg-gray-900 dark:dark:text-gray-100">
      <div className="flex flex-1 flex-col border-l-8 p-4 dark:dark:border-red-400">
        <span className="text-2xl">{props.error}</span>
        <span className="text-xs dark:dark:text-gray-400">Error</span>
      </div>
      <button
        onClick={() => props.setError("")}
        className="tracki flex items-center px-4 text-xs uppercase dark:dark:border-gray-700 dark:dark:text-gray-400"
      >
        Dismiss
      </button>
    </div>
  );
};

export default ErrorComp;
