import CoachReel from "@/components/CoachReel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const CoachesPage = () => {
  return (
    <MaxWidthWrapper>
      <CoachReel title={"All Coaches"} query={{ limit: 40 }} />
    </MaxWidthWrapper>
  );
};
export default CoachesPage;
