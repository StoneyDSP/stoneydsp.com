cmake_minimum_required(VERSION 3.22...3.28 FATAL_ERROR)

if(DEFINED ENV{VCPKG_ROOT} AND(NOT DEFINED CMAKE_TOOLCHAIN_FILE))
    set(VCPKG_ROOT $ENV{VCPKG_ROOT} CACHE FILEPATH "Path to vcpkg toolchain." FORCE)
    set(CMAKE_TOOLCHAIN_FILE "${VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake" CACHE FILEPATH "vcpkg toolchain file." FORCE)
endif()

# list(APPEND CMAKE_MODULE_PATH
# "${CMAKE_CURRENT_LIST_DIR}/extras/Build/CMake"
# )
project("WebViewPluginDemo" VERSION 0.0.1)

# find_package(JUCE CONFIG REQUIRED)
add_subdirectory("./native")
