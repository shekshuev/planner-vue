export const DefaultLayout = {
    template: /*html*/ `
        <div class="grid grid-cols-1 md:grid-cols-7 gap-4 pt-6">
            <div class="md:col-span-4 px-4 md:px-0 order-2 md:order-1">
                <slot name="left"></slot>
            </div>
            <div class="md:col-span-3 px-4 md:px-0 order-1 md:order-2">
                <slot name="right"></slot>
            </div>
        </div>
    `
};
