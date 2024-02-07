import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ReplayReel from "@/components/ReplayReel";

type Param = string | string[] | undefined;

interface ReplaysPageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const ReplayOfTheWeekPage = ({ searchParams }: ReplaysPageProps) => {
  const sort = parse(searchParams.sort);

  console.log(sort);
  return (
    <MaxWidthWrapper>
      <ReplayReel
        title={"All Replays"}
        query={{
          limit: 40,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};

export default ReplayOfTheWeekPage;
