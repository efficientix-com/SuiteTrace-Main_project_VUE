<template>
    <div id="module-component">
        <MenuComp/>
        <div class="card">
            <h2 class="blue-text">Dashboard</h2>
            <div>Content</div>
        </div>
        <FooterFreebugVue/>
    </div>
</template>
<script>
import FooterFreebugVue from '@/template/Commons/FooterFreebug.vue';
import MenuComp from "../../template/Navbar/MenuComponent.vue";
export default{
    name:'DashboardComponent',
    components:{MenuComp,FooterFreebugVue}
}
</script>