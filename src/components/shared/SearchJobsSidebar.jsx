import Button from "@/components/shared/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterJobs } from "@/lib/actions";

import { jobtype } from "@/lib/staticData";
import { jobLocations } from "@/lib/server-action/job-location";
async function SearchJobsSidebar({ defaultSearch }) {
  const jobs = await jobLocations();

  const filerdLocation = jobs.filter((job) => job.location !== null);
  
  const uniqueLocations = [];
  const filerdLocationSet = new Set();

  // filter same location
  filerdLocation.forEach((item) => {
    if (!filerdLocationSet.has(item.location)) {
      uniqueLocations.push(item);
      filerdLocationSet.add(item.location);
    }
  });
 

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 tabular-nums md:top-28 md:w-[260px]">
      <form action={filterJobs} className="space-y-3">
        <div>
          <label htmlFor="" className="text-medium">
            Search
          </label>
          <Input
            className="focus:border-2 focus:border-neutral-900"
            placeholder="Title, Company, etc"
            name="q"
            id="q"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-medium">
            Type
          </label>
          <Select name="type" id="type">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All type" />
            </SelectTrigger>
            <SelectContent>
              {jobtype.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.placeholder}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-medium">
            Location
          </label>
          <Select name="location" id="location">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Location" />
            </SelectTrigger>
            <SelectContent>
              {uniqueLocations?.map((item, index) => (
                <SelectItem key={index} value={item?.location}>
                  {item?.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-medium">
            Selary Range
          </label>
          <div className="flex gap-2">
            <Input
              className="focus:border-2 focus:border-neutral-900"
              placeholder="min"
              name="minimum"
              id="minimum"
              type="number"
            />
            <Input
              className="focus:border-2 focus:border-neutral-900"
              placeholder="max"
              name="maximum"
              type="number"
              id=" maximum"
            />
          </div>
        </div>
        <Button className="w-full rounded-md border bg-[#272E3F] py-2 font-normal text-white">
          Filter Job
        </Button>
      </form>
    </aside>
  );
}

export default SearchJobsSidebar;
