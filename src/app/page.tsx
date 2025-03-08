
"use client";
import { folderTree } from "@/constants/tree-data";
import { Button } from "@/shared/components/atoms/button";
import { Icon } from "@/shared/components/atoms/icon";
import TableCell from "@/shared/components/atoms/table-cell";
import TableCellActions from "@/shared/components/atoms/table-cell-actions";
import TreeWrapper from "@/shared/components/atoms/tree/tree-wrapper";
import { TableComponent } from "@/shared/components/table-component";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shared/components/ui/resizable";

import { Fragment, useEffect, useRef, useState } from "react";

export default function Home() {
  const trees = [folderTree, folderTree];
  const panelRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  const [showTableComponent, setShowTableComponent] = useState(true);
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0]);

  const handleExpand = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCollapse = (index: number) => {
    setExpandedIndices((prev) => prev.filter((i) => i !== index));
  };

  useEffect(() => {
    panelRefs.current.forEach((panel, index) => {
      if (panel) {
        const resizablePanel = panel.closest("[data-panel]");
        if (resizablePanel && resizablePanel instanceof HTMLElement) {
          if (!expandedIndices.includes(index)) {
            resizablePanel.style.flex = "0 0 10px";
          } else {
            resizablePanel.style.flex = "1 1 0"
          }
        }
      }
    });
  }, [expandedIndices]);

  const setPanelRef = (index: number) => (el: HTMLDivElement | null) => {
    panelRefs.current[index] = el;
  };

  function handleClick() {
    setShowTableComponent((prev) => !prev);
  }

  return (
    <>
      <div className="border-b border-grey-4 px-4 py-3">
        <Icon name="logo" size={24} />
      </div>

      {/* Main layout with horizontal resizing */}
      <ResizablePanelGroup direction="horizontal" className="h-screen">
        {/* Sidebar Panel */}
        <ResizablePanel 
          minSize={25} 
          maxSize={40} 
          defaultSize={25} 
          className="!overflow-auto"
        >
          <div className="shadow-xl min-w-[340px] select-none flex h-screen flex-col overflow-auto">
            <ResizablePanelGroup
              direction="vertical"
              className="h-full !overflow-auto"
            >
              <TableCell
                isHeader
                defaultValue="Project: "
                className="px-3 py-4 border-none"
                title="Web Project"
                showIcon
                iconOnClick={handleClick}
              />
              {showTableComponent &&
                trees.map((tree, index) => (
                  <Fragment key={index}>
                    <ResizablePanel
                      minSize={3}
                      className="!overflow-visible"
                      defaultSize={expandedIndices.includes(index) ? 53 : 3}
                    >
                      <div ref={setPanelRef(index)}>
                        <TreeWrapper
                          key={index}
                          initialTreeNodes={tree}
                          isExpanded={expandedIndices.includes(index)}
                          onExpand={() => handleExpand(index)}
                          onCollapse={() => handleCollapse(index)}
                        />
                      </div>
                    </ResizablePanel>
                    {index !== trees.length - 1 && (
                      <ResizableHandle className="!h-0.5 bg-muted" />
                    )}
                  </Fragment>
                ))}
            </ResizablePanelGroup>
          </div>
        </ResizablePanel>

        {/* Horizontal Resize Handle */}
        <ResizableHandle withHandle className="bg-gray-200" />

       
        <ResizablePanel defaultSize={75} className="overflow-auto">
          <div className="flex h-full flex-col bg-grey-2">
            <div className="w-full flex justify-end border-t-0 p-4">
              <TableCellActions
                name={["plus-icon", "pen", "file-data", "trash", "dots"]}
                iconClassName="size-5"
                iconColors="#8793A0"
                className="border-none gap-x-4"
              />
              <Button
                variant="success"
                className="border-none"
                icon="save"
                iconClassName="size-5"
              >
                Save
              </Button>
            </div>
            <div className="px-4 flex-1 overflow-auto">
              <TableComponent className="bg-white" />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}