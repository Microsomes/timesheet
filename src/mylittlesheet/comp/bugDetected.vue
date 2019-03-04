<!--
    @author Tayyab
    @date 13/02/2019
-->


<template>

    <div style="height:60px;display:flex;" >
        <div style="width:50px;height:100%;display:flex;align-items:center;justify-content:center;">
              <i style="color:red;font-size:30px" class="material-icons">warning</i>
        </div>
        <div style="display:flex;align-items:center;">
            <slot></slot>
        </div>
    </div>

</template>