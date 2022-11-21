<template>
    <Teleport to="body">
        <div class="modal">
            <div class="close-modal-btn" @click="$emit('close')">
                <i class="fa fa-times"></i>
            </div>
            <slot></slot>
        </div>
    </Teleport>
</template>

<style scoped>
    .modal {
        background-color: white;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        top: 12vh;
        max-width: 600px;
        right: 0;
        width: fit-content;
        padding: 2em;
        border-radius: 10px;
        animation: entrance .5s linear;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    }
    .close-modal-btn{
        position: absolute;
        top: 0.3em;
        right: 1em;
        cursor:pointer;
    }
    @keyframes entrance {
        0%{
            opacity: 0%;
            
        }
        100%{
            opacity: 100%;
        }
    }
    </style>