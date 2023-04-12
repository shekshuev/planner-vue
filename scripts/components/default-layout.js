export const DefaultLayout = {
    template: /*html*/ `
        <div class="grid grid-cols-7 gap-4 pt-6">
            <div class="col-span-4">
                <slot name="left"></slot>
            </div>
            <div class="col-span-3">
                <slot name="right"></slot>
            </div>
        </div>
    `
};
