#include <bits/stdc++.h>
using namespace std;

int pack_count(const std::vector<int>& weights, int capacity) {
    int used = 0, count = 0;
    for (int w : weights) {
        if (used + w > capacity) break;
        used += w;
        count++;
    }
    return count;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> weights(n);
    for (int& x : weights) cin >> x;
    int capacity;
    cin >> capacity;
    cout << pack_count(weights, capacity) << "\n";
    return 0;
}
