import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

function EarthquakeSkeleton() {
  return (
    <div className="mt-5 flex w-full flex-col items-start gap-10 px-4 lg:flex-row lg:px-10">
      <div className="flex w-full flex-col gap-3 lg:w-1/2">
        <p className="text-lg font-bold">Earthquake details</p>
        <div className="grid w-full grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Occurred At</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-40" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Magnitude</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-16" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Depth</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-20" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Coordinates</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-32" />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 lg:w-1/2">
        <p className="text-lg font-bold">Location on map</p>
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </div>
  );
}

export default EarthquakeSkeleton;
