"use client";

import * as React from "react";
import { GripVertical } from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";

import { cn } from "@/src/lib/utils";

/**
 * Updated for react-resizable-panels v4+
 *
 * Notes:
 * - v4 exports: Group, Panel, Separator (not PanelGroup / PanelResizeHandle)
 * - orientation uses aria-orientation (not data-panel-group-direction)
 * - keep the wrapper API small and typesafe for usage
 */

type GroupProps = React.ComponentProps<typeof Group>;
type PanelProps = React.ComponentProps<typeof Panel>;
type SeparatorProps = React.ComponentProps<typeof Separator> & {
  withHandle?: boolean;
};

const ResizablePanelGroup = ({ className, ...props }: GroupProps) => (
  <Group
    className={cn(
      // use aria-orientation attribute selector for vertical orientation
      // Tailwind arbitrary variants use the bracket syntax; keep concise
      "flex h-full w-full [aria-orientation=\"vertical\"]:flex-col",
      className
    )}
    {...props}
  />
);

const ResizablePanel = (props: PanelProps) => <Panel {...props} />;

const ResizableHandle = ({ withHandle, className, ...props }: SeparatorProps) => (
  <Separator
    className={cn(
      // styling similar to earlier implementation but using aria attributes
      "relative flex w-px items-center justify-center bg-border " +
        "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 " +
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring " +
        "focus-visible:ring-offset-1 " +
        // vertical orientation variants
        "[aria-orientation=\"vertical\"]:h-px [aria-orientation=\"vertical\"]:w-full " +
        "[aria-orientation=\"vertical\"]:after:left-0 [aria-orientation=\"vertical\"]:after:h-1 " +
        "[aria-orientation=\"vertical\"]:after:w-full [aria-orientation=\"vertical\"]:after:-translate-y-1/2 " +
        "[aria-orientation=\"vertical\"]:after:translate-x-0",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-gray-500">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </Separator>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
