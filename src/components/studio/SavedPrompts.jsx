import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Bookmark,
  Clock3,
  Sparkles,
  Trash2,
} from "lucide-react";

export default function SavedPrompts({
  prompts,
  onSelect,
  onDelete,
}) {
  return (
    <Card className="h-fit rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl backdrop-blur">

      <CardContent className="p-6">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Bookmark className="h-6 w-6 text-violet-400" />

            <div>

              <h2 className="text-xl font-bold text-white">
                Saved Prompts
              </h2>

              <p className="text-sm text-slate-400">
                Your personal prompt library
              </p>

            </div>

          </div>

          <Badge className="bg-violet-600 hover:bg-violet-600">
            {prompts.length}
          </Badge>

        </div>

        <ScrollArea className="h-[700px] pr-2">

          {prompts.length === 0 ? (

            <div className="flex h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 text-center">

              <Bookmark className="mb-5 h-12 w-12 text-slate-600" />

              <h3 className="text-lg font-semibold text-white">
                No Saved Prompts Yet
              </h3>

              <p className="mt-2 max-w-xs text-sm text-slate-500">
                Run a prompt and save it to build your personal prompt library.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {prompts.map((item) => (

                <Card
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-950 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:bg-slate-900"
                >

                  <CardContent className="p-5">

                    {/* Title */}

                    <div className="flex items-start justify-between">

                      <div>

                        <h3 className="font-semibold text-white line-clamp-2">
                          {item.title}
                        </h3>

                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item.id);
                        }}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                    </div>

                    {/* Prompt Preview */}

                    <p className="mt-3 line-clamp-2 text-sm text-slate-500">
                      {item.prompt}
                    </p>

                    {/* Tags */}

                    <div className="mt-4 flex flex-wrap gap-2">

                      <Badge
                        variant="outline"
                        className="border-violet-500/30 text-violet-300"
                      >
                        {item.model}
                      </Badge>

                      <Badge
                        variant="outline"
                        className="border-yellow-500/30 text-yellow-300"
                      >
                        <Sparkles className="mr-1 h-3 w-3" />
                        {item.tokens}
                      </Badge>

                    </div>

                    {/* Footer */}

                    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">

                      <div className="flex items-center gap-2">

                        <Clock3 className="h-3 w-3" />

                        <span>{item.latency}</span>

                      </div>

                      <span>{item.cost}</span>

                    </div>

                  </CardContent>

                </Card>

              ))}

            </div>

          )}

        </ScrollArea>

      </CardContent>

    </Card>
  );
}