import {
  useCurrentSidebarSiblings,
  filterDocCardListItems,
} from '@docusaurus/plugin-content-docs/client';
import DocCardList from "@theme/DocCardList"

export default {
    内容列表(){
        const items = useCurrentSidebarSiblings();
        const filtered = []

        for(let i=1;i<items.length;i++){
            filtered.push(items[i])
        }
        return <DocCardList items={filtered} />;
    }
};