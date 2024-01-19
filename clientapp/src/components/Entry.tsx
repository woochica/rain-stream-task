const Entry = ({counter}) => {
    return (
        <a
          href=""
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            {counter}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Some text
          </p>
        </a>
    );
};

export default Entry;
