type Props = {
  createdAt: string;
  url: string;
  content: string;
  avatar: string;
  displayName: string;
};

export const Entry = ({
  createdAt,
  url,
  content,
  avatar,
  displayName,
}: Props) => {
  const markup = { __html: content };
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div className="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <a href={url} target="_blank" rel="external nofollow">
            <div
              className="text-gray-900 text-xl mb-2 text-left"
              dangerouslySetInnerHTML={markup}
            ></div>
          </a>
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={avatar}
            alt={displayName}
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none text-left">
              {displayName}
            </p>
            <p className="text-gray-600">{createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
