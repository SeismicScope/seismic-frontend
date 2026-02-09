import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import DatePickerWithRange from "../date-range";
import DepthRange from "../depth-range";
import MagnitudeRange from "../magnitude-range";

function Filters() {
  return (
    <div className="flex w-full gap-4 py-4">
      <div className="flex w-1/3 flex-col gap-4">
        <Card className="h-24 w-full gap-2 py-3">
          <CardHeader className="px-3">
            <CardTitle>Date Picker Range</CardTitle>
          </CardHeader>
          <CardContent className="px-3">
            <DatePickerWithRange />
          </CardContent>
        </Card>
        <Card className="h-24 w-full gap-2 py-3">
          <CardHeader className="px-3">
            <CardTitle>Depth Range</CardTitle>
          </CardHeader>
          <CardContent className="px-3">
            <DepthRange />
          </CardContent>
        </Card>
      </div>
      <Card className="w-2/3 gap-2 py-3">
        <CardHeader className="px-3">
          <CardTitle>Magnitude Range</CardTitle>
        </CardHeader>
        <CardContent className="px-3">
          <MagnitudeRange />
        </CardContent>
      </Card>
    </div>
  );
}

export default Filters;
