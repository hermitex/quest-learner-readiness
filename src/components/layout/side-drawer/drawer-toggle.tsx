import * as React from "react";
import { Button } from "../../ui/button/button";

type DrawerToggleProps = {
    onClick: () => void;
};

export function DrawerToggle({ onClick }: DrawerToggleProps) {
    return (
        <Button
            variant="tertiary"
            onClick={onClick}
            className="md:hidden"
        >
            Menu
        </Button>
    );
}
