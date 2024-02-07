import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TankReel from "@/components/TankReel";
import { TANK_NATIONS, TANK_NATIONS_REFERENCE } from "@/config";

type Param = string | string[] | undefined;

interface ReplaysPageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const TankOfTheWeekPage = ({ searchParams }: ReplaysPageProps) => {
  const sort = parse(searchParams.sort);
  const nation = parse(searchParams.nation);
  const type = parse(searchParams.type);

  let nationality = "";
  if (nation) {
    const index = TANK_NATIONS.indexOf(nation);
    nationality = TANK_NATIONS_REFERENCE[index];
  }

  return (
    <MaxWidthWrapper>
      <TankReel
        title={`All ${nation ? nationality : ""} ${type ? type : "Tank"}s`}
        query={{
          nation,
          type,
          limit: 40,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};

export default TankOfTheWeekPage;
