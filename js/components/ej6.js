const ej6 = /*html*/`
<h1>Ejercicio 6</h1>
<h2>Implementacion de los 3 metodos en arreglo grande mitad ordenado mitad no</h2>
<p id="enunciado">Ordenamiento de Arreglos Parcialmente Ordenados, diseña un arreglo en el que la mitad de los elementos estén ordenados y la otra mitad esté desordenada. Compara el rendimiento de los métodos de ordenamiento. ¿Cuál método demuestra ser más eficiente en este caso?
<br>Para la elaboración de este ejercicio se crea un array de 10000 enteros, por lo cual imprimirlo es innecesario, sin embargo el código utilizado para cada método es muy similar a todos los anteriores planteados por lo cual se sabe que funciona.</p>
<div id="codigo">
<pre class="code-container">
    <button class="copy-button">Copiar</button>
    <code class="language-cpp">
    <script type="text/x-c++src">
        import java.util.Random;
            import java.util.Stack;

            class Ej6 {

                public static int[] createMixedArray(int size) {
                    int[] array = new int[size];
                    Random random = new Random();

                    for (int i = 0; i < size / 2; i++) {
                        array[i] = i;
                    }

                    for (int i = size / 2; i < size; i++) {
                        array[i] = random.nextInt(size);
                    }
                    for (int i = size - 1; i > size / 2; i--) {
                        int index = random.nextInt(size / 2);
                        // Intercambiar elementos
                        int temp = array[i];
                        array[i] = array[index];
                        array[index] = temp;
                    }

                    return array;
                }

                public static int bubbleSort(int[] arr) {
                    int n = arr.length;
                    int comparaciones = 0;
                    for (int i = 0; i < n - 1; ++i) {
                        for (int j = 0; j < n - i - 1; ++j) {
                            comparaciones++;
                            if (arr[j] > arr[j + 1]) {
                                int temp = arr[j];
                                arr[j] = arr[j + 1];
                                arr[j + 1] = temp;
                            }
                        }
                    }
                    return comparaciones;
                }

                public static int improvBubbleSort(int[] arr) {
                    int N = arr.length;
                    int comparaciones = 0;
                    for (int i = N - 1; i > 0; i--) {
                        for (int j = 0; j < i; j++) {
                            comparaciones++;
                            if (arr[j] > arr[j + 1]) {
                                int temp = arr[j];
                                arr[j] = arr[j + 1];
                                arr[j + 1] = temp;

                            }
                        }

                    }
                    return comparaciones;
                }

                public static int quickSort(int arr[], int inicio, int fin) {
                    int comparaciones = 0;
                    Stack<Integer> stack = new Stack<>();
                    stack.push(inicio);
                    stack.push(fin);

                    while (!stack.isEmpty()) {
                        fin = stack.pop();
                        inicio = stack.pop();

                        if (inicio < fin) {
                            int pivotIndex = partition(arr, inicio, fin);
                            stack.push(inicio);
                            stack.push(pivotIndex - 1);
                            stack.push(pivotIndex + 1);
                            stack.push(fin);
                            comparaciones += (fin - inicio + 1); // Contar todas las comparaciones en esta iteración
                        }
                    }

                    return comparaciones;
                }

                private static int partition(int arr[], int inicio, int fin) {
                    int pivot = arr[inicio];
                    int left = inicio + 1;
                    int right = fin;
                
                    while (left <= right) {
                        while (left <= fin && arr[left] < pivot) {
                            left++;
                        }
                        while (right > inicio && arr[right] >= pivot) {
                            right--;
                        }
                        if (left < right) {
                            int temp = arr[left];
                            arr[left] = arr[right];
                            arr[right] = temp;
                        }
                    }
                
                    if (right > inicio) {
                        int temp = arr[right];
                        arr[right] = arr[inicio];
                        arr[inicio] = temp;
                    }
                
                    return right;
                }

                public static void main(String[] args) {

                    // Datos proporcrionados
                    int size = 100000;
                    int[] array = createMixedArray(size);

                    // Burbuja
                    System.out.println("xxxxx Metodo de burbuja xxxxx");
                    // System.out.println("Array original: ");
                    // for (int i = 0; i < array.length; i++) {
                    // System.out.print(array[i] + ", ");
                    // }

                    long startTimeBurb = System.currentTimeMillis();
                    int compBurb = bubbleSort(array);
                    long endTimeBurb = System.currentTimeMillis();
                    long executionTimeBurb = endTimeBurb - startTimeBurb;

                    Runtime runtimeBurb = Runtime.getRuntime();
                    long memoryBurb = runtimeBurb.totalMemory() - runtimeBurb.freeMemory();

                    // System.out.println("");
                    // System.out.println("Array ordenado: ");
                    // for (int i = 0; i < array.length; i++) {
                    // System.out.print(array[i] + ", ");
                    // }
                    System.out.println("");
                    System.out.println("Cantidad de comparaciones: " + compBurb);

                    System.out.println("Tiempo de ejecución: " + executionTimeBurb + " milisegundos");
                    System.out.println("Memoria utilizada: " + memoryBurb + " bytes");

                    // Burbuja Mejorada
                    System.out.println("");
                    System.out.println("");
                    System.out.println("xxxxx Metodo de burbuja mejorada xxxxx");
                    // System.out.println("Array original: ");
                    // for (int i = 0; i < array.length; i++) {
                    // System.out.print(array[i] + ", ");
                    // }

                    long startTimeBurbMej = System.currentTimeMillis();
                    int compBurbMej = improvBubbleSort(array);
                    long endTimeBurbMej = System.currentTimeMillis();
                    long executionTimeBurbMej = endTimeBurbMej - startTimeBurbMej;

                    Runtime runtimeBurbMej = Runtime.getRuntime();
                    long memoryBurbMej = runtimeBurbMej.totalMemory() - runtimeBurbMej.freeMemory();

                    // System.out.println("");
                    // System.out.println("Array ordenado: ");
                    // for (int i = 0; i < array.length; i++) {
                    // System.out.print(array[i] + ", ");
                    // }
                    System.out.println("");
                    System.out.println("Cantidad de comparaciones: " + compBurbMej);

                    System.out.println("Tiempo de ejecución: " + executionTimeBurbMej + " milisegundos");
                    System.out.println("Memoria utilizada: " + memoryBurbMej + " bytes");

                    // Quick Sort
                    System.out.println("");
                    System.out.println("");
                    System.out.println("xxxxx Metodo Quick Sort xxxxx");
                    // System.out.println("Array original: ");
                    // for (int i = 0; i < array.length; i++) {
                    // System.out.print(array[i] + ", ");
                    // }

                    long startTimeQS = System.currentTimeMillis();
                    int compQS = quickSort(array, 0, array.length - 1);
                    long endTimeQS = System.currentTimeMillis();
                    long executionTimeQS = endTimeQS - startTimeQS;

                    Runtime runtimeQS = Runtime.getRuntime();
                    long memoryQS = runtimeQS.totalMemory() - runtimeQS.freeMemory();

                    // System.out.println("");
                    // System.out.println("Array ordenado: ");
                    // for (int i = 0; i < array.length; i++) {
                    // System.out.print(array[i] + ", ");
                    // }
                    System.out.println("");
                    System.out.println("Cantidad de comparaciones: " + compQS);

                    System.out.println("Tiempo de ejecución: " + executionTimeQS + " milisegundos");
                    System.out.println("Memoria utilizada: " + memoryQS + " bytes");

                }

        }
    </script>
    </code>
</pre>
</div>
<div id=div_img_res>
    <h5>Resultado</h5>
    <img src="imgs/ej6A.png" id="img_res">
</div>

`;
export default ej6